import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import { manageWithReferences } from './plugins/ManageWithReferences'

export default defineConfig({
  name: 'default',
  title: 'kstone_cms',
  projectId: '1k8147nt',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  document: {
    actions: (prev, context) => manageWithReferences(prev, context),
  },
})
