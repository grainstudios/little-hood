// Sanity CLI config. A plain object default export works the same as wrapping
// it in defineCliConfig() (which is only a type helper), and avoids any
// subpath-export resolution issues across Sanity/Node versions.
export default {
  api: {
    projectId: '8a36ilal',
    dataset: 'production',
  },
  /**
   * The studio host determines the URL of the hosted admin panel after
   * `npx sanity deploy`, e.g. https://thelittlehood.sanity.studio
   * You'll be asked to confirm this the first time you deploy.
   */
  studioHost: 'thelittlehood',
}
