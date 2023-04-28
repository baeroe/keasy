import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateFolder, addFolder } from '../../redux/dataSlice'

export default function EditFolderModal(props) {
  const { closeModal, visible, folder } = props
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const [foldername, setFoldername] = useState(folder ? folder.name : '')
  const [validationSet, setValidationSet] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (foldername == '') {
      setValidationSet(['name'])
      return
    }

    if (folder) {
      dispatch(updateFolder({ ...folder, name: foldername }))
      closeModal()
      return
    }
    dispatch(addFolder({ name: foldername }))
    closeModal()
  }

  useEffect(() => {
    if (visible) {
      inputRef.current.focus()
    }
  }, [visible])

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="folderName" className="text-gray-400 text-sm">
            Name:<span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            ref={inputRef}
            type="text"
            name="folderName"
            className={`custom-text mb-5 ${
              validationSet.includes('name') ? '!bg-red-100 !border-red-500 border' : ''
            }`}
            defaultValue={foldername}
            onChange={(e) => setFoldername(e.target.value)}
          />
          <input type="submit" className="custom-submit" value="Speichern" />
        </div>
      </form>
    </div>
  )
}
