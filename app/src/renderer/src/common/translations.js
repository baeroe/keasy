import i18n from 'i18next'

export const resources = {
  en: {
    translation: {
      welcome: 'Welcome to Keasy',
      selectKeasyfile: 'Select your keasyfile',
      enterPwForDecryption: 'Enter your password to decrypt your keasyfile',
      open: 'Open',
      orCreateNew: 'or create a new keasyfile',
      create: 'Create',
      createNew: 'Create a new keasyfile',
      selectLocation: 'Select a location for your keasyfile',
      enterPwForEncryption: 'Enter a password for encryption',
      confirmPw: 'Confirm your password',
      wrongPw: 'Wrong password',
      fileNotExisting: 'File does not exist',
      fileAlreadyExisting: 'File already exists',
      pwnotmatching: 'Passwords do not match',
      folder: 'Folder',
      newFolder: 'New folder',
      editFolder: 'Edit folder',
      folderName: 'Folder name',
      deleteFolder: 'Delete folder',
      deleteFolderText: 'Are you sure you want to delete this folder with all its keycards?',
      yesImSure: "Yes, I'm sure",
      newKeycard: 'New keycard',
      editKeycard: 'Edit keycard',
      deleteKeycard: 'Delete keycard',
      deleteKeycardText: 'Are you sure you want to delete this keycard?',
      name: 'Keycard name',
      username: 'Username',
      password: 'Password',
      save: 'Save',
      usernameCopied: 'Username copied to clipboard',
      passwordCopied: 'Password copied to clipboard',
      paste: 'Paste',
      language: 'Language',
      english: 'English',
      german: 'German',
      settings: 'Settings'
    }
  },
  de: {
    translation: {
      welcome: 'Wilkommen bei Keasy',
      selectKeasyfile: 'Wähle dein Keasyfile aus',
      enterPwForDecryption: 'Gib dein Passwort zum Entschlüsseln ein',
      open: 'Öffnen',
      orCreateNew: 'oder erstelle ein neues Keasyfile',
      create: 'Erstellen',
      createNew: 'Erstelle ein neues Keasyfile',
      selectLocation: 'Wähle einen Ordner für dein Keasyfile',
      enterPwForEncryption: 'Gib ein Passwort für die Verschlüsselung ein',
      confirmPw: 'Bestätige dein Passwort',
      wrongPw: 'Password falsch',
      noSaveLocation: 'Kein Speicherort ausgewählt',
      fileNotExisting: 'Datei existiert nicht',
      fileAlreadyExisting: 'Datei existiert bereits',
      pwnotmatching: 'Passwörter stimmen nicht überein',
      folder: 'Ordner',
      newFolder: 'Neuer Ordner',
      editFolder: 'Ordner bearbeiten',
      folderName: 'Ordnername',
      deleteFolder: 'Ordner löschen',
      deleteFolderText:
        'Sind Sie sicher, dass Sie diesen Ordner mit allen seinen Schlüsselkarten löschen möchten?',
      yesImSure: 'Ja, ich bin sicher',
      newKeycard: 'Neue Schlüsselkarte',
      editKeycard: 'Schlüsselkarte bearbeiten',
      deleteKeycard: 'Schlüsselkarte löschen',
      deleteKeycardText: 'Sind Sie sicher, dass Sie diese Schlüsselkarte löschen möchten?',
      name: 'Schlüsselkartenname',
      username: 'Benutzername',
      password: 'Passwort',
      save: 'Speichern',
      usernameCopied: 'Benutzername in Zwischenablage kopiert',
      passwordCopied: 'Passwort in Zwischenablage kopiert',
      paste: 'Einfügen',
      language: 'Sprache',
      english: 'Englisch',
      german: 'Deutsch',
      settings: 'Einstellungen'
    }
  }
}

export const changeLanguage = (lng) => {
  i18n.changeLanguage(lng)
}
