import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '1k8147nt',
    dataset: 'production',
  },
  autoUpdates: true,
})
