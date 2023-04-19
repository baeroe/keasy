import React from 'react'

export default function DeleteCardModal() {
  return (
    <div>
      <div className="flex flex-col">
        <span className="text-white mb-5 text-center">
          Bist du dir sicher, dass du die Keycard <br /> löschen möchtest?
        </span>
        <input type="button" value="Ja, ich bin mir sicher" className="custom-delete" />
      </div>
    </div>
  )
}
