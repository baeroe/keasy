import React from 'react'

export default function DeleteFolderModal() {
  return (
    <div>
      <div className="flex flex-col">
        <span className="text-white mb-5 text-center">
          Bist du dir sicher, dass du den Ordner mit <br /> allen Keycards löschen möchstest?
        </span>
        <input type="button" value="Ja, ich bin mir sicher" className="custom-delete" />
      </div>
    </div>
  )
}
