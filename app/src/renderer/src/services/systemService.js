import { AES, enc } from 'crypto-js'

class SystemService {
  constructor() {}

  async selectFileAsync() {
    const dialogConfig = {
      properties: ['openFile']
    }
    return await electron.ipcRenderer.invoke('showOpenDialog', dialogConfig)
  }

  async selectFolderAsync() {
    const dialogConfig = {
      properties: ['openDirectory', 'createDirectory']
    }

    return await electron.ipcRenderer.invoke('showOpenDialog', dialogConfig)
  }

  async initKeasyFile(path, password) {
    var initContent = {
      folders: [],
      created: new Date().toLocaleDateString(),
      updated: new Date().toLocaleDateString()
    }

    var initContentJson = JSON.stringify(initContent)
    var encrypted = AES.encrypt(JSON.stringify(initContentJson), password).toString()

    const writeFileConfig = {
      path: path,
      content: encrypted
    }

    await electron.ipcRenderer.invoke('writeFileSync', writeFileConfig)

    return initContent
  }

  async readKeasyFile(path, password) {
    try {
      var encrypted = await electron.ipcRenderer.invoke('readFileSync', path)
      var decrypted = AES.decrypt(encrypted, password).toString(enc.Utf8)
      var decryptedJson = JSON.parse(JSON.parse(decrypted))
      return {
        success: true,
        data: decryptedJson
      }
    } catch (err) {
      return {
        success: false,
        data: err
      }
    }
  }

  async writeKeasyFile(path, password, content) {
    var contentJson = JSON.stringify(content)
    var encrypted = AES.encrypt(JSON.stringify(contentJson), password).toString()

    const writeFileConfig = {
      path: path,
      content: encrypted
    }

    var result = await electron.ipcRenderer.invoke('writeFileSync', writeFileConfig)
  }

  async minimizeAndPasteCredentials(card) {
    const credentials = {
      username: card.username,
      password: card.password
    }

    await electron.ipcRenderer.invoke('minimizeAndPasteCredentials', credentials)
  }
}

export const useSystemService = () => {
  return new SystemService()
}
