import React, { useEffect, useRef } from 'react'

export default function EditFolderModal(props) {
  const { closeModal, visible } = props
  const handleSubmit = () => {
    console.log('submit')
    closeModal()
  }
  const inputRef = useRef(null)

  useEffect(() => {
    if (visible) {
      inputRef.current.focus()
    }
  }, [visible])

  return (
    <div>
      <form action={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="folderName" className="text-gray-400 text-sm">
            Name:
          </label>
          <input ref={inputRef} type="text" name="folderName" className="custom-text mb-2" />
        </div>
        <input type="submit" className="custom-submit" value="Save" />
      </form>
    </div>
  )
}
