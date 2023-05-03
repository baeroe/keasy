module.exports = {
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'baeroe',
          name: 'keasy'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
}
