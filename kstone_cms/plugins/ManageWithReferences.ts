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
  // Get all published properties that reference this document
  const properties = await client.fetch(
    `*[references($id) && _type == "property" && !(_id in path("drafts.**"))]{_id}`,
    {id},
  )

  // If this is a city, get its published communities too
  let communities = []
  if (type === 'city') {
    communities = await client.fetch(
      `*[references($id) && _type == "community" && !(_id in path("drafts.**"))]{_id}`,
      {id},
    )
  }

  return {
    properties: properties.map((p: any) => p._id),
    communities: communities.map((c: any) => c._id),
  }
}

const unpublishDocument = async (client: any, id: string) => {
  try {
    // 1. First get the published document
    const publishedDoc = await client.getDocument(id)
    if (!publishedDoc) return // Nothing to unpublish

    // 2. Find all draft documents that reference this published document
    const referencingDrafts = await client.fetch(
      `*[references($id) && _id in path("drafts.**")]{_id, _type}`,
      {id},
    )

    // 3. Create a transaction to handle all reference cleanup
    const transaction = client.transaction()

    // 4. For each referencing draft, remove the references
    for (const draft of referencingDrafts) {
      // Get the draft document to inspect its fields
      const draftDoc = await client.getDocument(draft._id)

      // Find all reference fields pointing to our document
      const refFields = Object.keys(draftDoc).filter((key) => {
        const value = draftDoc[key]
        if (!value) return false

        // Handle direct references
        if (value._ref === id) return true

        // Handle array references
        if (Array.isArray(value)) {
          return value.some((item) => item._ref === id)
        }

        return false
      })

      // Unset these reference fields in the draft
      if (refFields.length > 0) {
        transaction.patch(draft._id, {unset: refFields})
      }
    }

    // 5. Execute the reference cleanup
    await transaction.commit()

    // 6. Create a draft copy of the published document
    await client.createOrReplace({
      ...publishedDoc,
      _id: `drafts.${id.replace(/^drafts\./, '')}`,
    })

    // 7. Now it's safe to delete the published document
    await client.delete(id)
  } catch (error) {
    console.error(`Failed to unpublish document ${id}:`, error)
    throw error
  }
}

const handleDocumentTree = async (client: any, id: string, type: string) => {
  const {properties, communities} = await getDocumentTree(client, id, type)
  let count = 0

  // Process in correct order: properties → communities → main document
  const allDocuments = [
    ...properties,
    ...(type === 'city' ? communities : []),
    id, // Main document last
  ]

  for (const docId of allDocuments) {
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
      // First unpublish all dependent documents in correct order
      const count = await handleDocumentTree(client, id, type)

      // Then delete both draft and published versions of the main document
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
    if (!window.confirm(`This will unpublish this ${type} and all connected documents. Continue?`))
      return

    setIsUnpublishing(true)
    try {
      // Handle all documents in the tree
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
