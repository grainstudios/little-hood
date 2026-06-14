import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '8a36ilal',
    dataset: 'production',
  },
  /**
   * The studio host determines the URL of the hosted admin panel after
   * `npx sanity deploy`, e.g. https://thelittlehood.sanity.studio
   * You'll be asked to pick this the first time you deploy.
   */
  studioHost: 'thelittlehood',
})
