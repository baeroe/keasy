import React, { useEffect, useRef } from 'react'

export default function EditCardModal(props) {
  const { closeModal, visible } = props
  const handleSubmit = () => {}

  const inputRef = useRef(null)

  useEffect(() => {
    if (visible) {
      inputRef.current.focus()
    }
  }, [visible])
  return (
    <div>
      <form action={handleSubmit}>
        <div className="flex flex-col w-80">
          <label htmlFor="folderName" className="text-gray-400 text-sm">
            Name:
          </label>
          <input ref={inputRef} type="text" name="folderName" className="custom-text mb-5" />
          <label htmlFor="folderName" className="text-gray-400 text-sm">
            Benutzername:
          </label>
          <input type="text" name="folderName" className="custom-text mb-5" />
          <label htmlFor="folderName" className="text-gray-400 text-sm">
            Passwort:
          </label>
          <input type="text" name="folderName" className="custom-text mb-5" />
          <input type="submit" className="custom-submit" value="Speichern" />
        </div>
      </form>
    </div>
  )
}
