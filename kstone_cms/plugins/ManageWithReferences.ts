// ./plugins/ManageWithReferences.ts
import {useCallback, useState} from 'react'
import {useClient} from 'sanity'
import type {DocumentActionComponent, DocumentActionProps} from 'sanity'

export function manageWithReferences(
  prev: DocumentActionComponent[],
  {schemaType}: {schemaType: string},
): DocumentActionComponent[] {
  if (['city', 'community'].includes(schemaType)) {
    return [
      ...prev.filter((action) => !['delete', 'unpublish'].includes(action.action || '')),
      DeleteWithReferencesAction,
      UnpublishWithReferencesAction,
    ]
  }
  return prev
}

const getDocumentTree = async (client: any, id: string, type: string) => {
  const relatedSchemas = [
    'floorPlans',
    'preConstruction',
    'quickPossession',
    'showCity',
    'showHome',
  ]

  const referencedDocs = await Promise.all(
    relatedSchemas.map((schema) =>
      client.fetch(
        `*[references($id) && _type == "${schema}" && !(_id in path("drafts.**"))]{_id}`,
        {id},
      ),
    ),
  )

  let communities: string[] = []
  if (type === 'city') {
    const communityDocs = await client.fetch(
      `*[references($id) && _type == "community" && !(_id in path("drafts.**"))]{_id}`,
      {id},
    )
    communities = communityDocs.map((doc: any) => doc._id)
  }

  return {
    related: referencedDocs.flat().map((doc: any) => doc._id),
    communities,
  }
}

const unpublishDocument = async (client: any, id: string) => {
  try {
    const publishedDoc = await client.getDocument(id)
    if (!publishedDoc) return

    const referencingDrafts = await client.fetch(
      `*[references($id) && _id in path("drafts.**")]{_id}`,
      {id},
    )

    const transaction = client.transaction()

    for (const draft of referencingDrafts) {
      const draftDoc = await client.getDocument(draft._id)
      const refFields = Object.keys(draftDoc).filter((key) => {
        const value = draftDoc[key]
        if (!value) return false
        if (value._ref === id) return true
        if (Array.isArray(value)) return value.some((v) => v._ref === id)
        return false
      })

      if (refFields.length > 0) {
        transaction.patch(draft._id, {unset: refFields})
      }
    }

    await transaction.commit()

    await client.createOrReplace({
      ...publishedDoc,
      _id: `drafts.${id.replace(/^drafts\./, '')}`,
    })

    await client.delete(id)
  } catch (error) {
    console.error(`Failed to unpublish ${id}:`, error)
    throw error
  }
}

const handleDocumentTree = async (client: any, id: string, type: string) => {
  const {related, communities} = await getDocumentTree(client, id, type)

  const allDocs = [...related, ...(type === 'city' ? communities : []), id]

  let count = 0
  for (const docId of allDocs) {
    try {
      await unpublishDocument(client, docId)
      count++
    } catch (error) {
      console.error(`Failed to unpublish ${docId}:`, error)
      throw error
    }
  }

  return count - 1
}

const DeleteWithReferencesAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const {id, type, onComplete} = props
  const client = useClient({apiVersion: '2023-05-01'})
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = useCallback(async () => {
    if (
      !window.confirm(
        `This will DELETE this ${type} and UNPUBLISH all connected documents. Continue?`,
      )
    )
      return

    setIsDeleting(true)
    try {
      const count = await handleDocumentTree(client, id, type)
      await client.delete(id)
      await client.delete(`drafts.${id}`)

      alert(`Successfully deleted this ${type} and unpublished ${count} connected documents`)
      onComplete()
    } catch (error) {
      console.error('Delete operation failed:', error)
      alert(`Delete failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsDeleting(false)
    }
  }, [client, id, type, onComplete])

  return {
    label: isDeleting ? 'Deleting...' : 'Delete',
    onHandle: handleDelete,
    tone: 'critical',
    disabled: isDeleting,
  }
}

const UnpublishWithReferencesAction: DocumentActionComponent = (props: DocumentActionProps) => {
  const {id, type, published, onComplete} = props
  const client = useClient({apiVersion: '2023-05-01'})
  const [isUnpublishing, setIsUnpublishing] = useState(false)

  const handleUnpublish = useCallback(async () => {
    if (!window.confirm(`This will UNPUBLISH this ${type} and all connected documents. Continue?`))
      return

    setIsUnpublishing(true)
    try {
      const count = await handleDocumentTree(client, id, type)

      alert(`Successfully unpublished this ${type} and ${count} connected documents`)
      onComplete()
    } catch (error) {
      console.error('Unpublish operation failed:', error)
      alert(`Unpublish failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsUnpublishing(false)
    }
  }, [client, id, type, onComplete])

  return {
    label: isUnpublishing ? 'Unpublishing...' : 'Unpublish',
    onHandle: handleUnpublish,
    tone: 'caution',
    disabled: isUnpublishing || !published,
  }
}
