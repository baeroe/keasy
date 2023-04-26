import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFolder } from '../../redux/dataSlice'

export default function DeleteFolderModal(props) {
  const { closeModal, visible, folder } = props
  const dispatch = useDispatch()

  const handleDelete = (e) => {
    dispatch(removeFolder(folder.id))
    closeModal()
  }

  return (
    <div>
      <div className="flex flex-col">
        <span className="text-white mb-5 text-center">
          Bist du dir sicher, dass du den Ordner mit <br /> allen Keycards löschen möchstest?
        </span>
        <input
          type="button"
          value="Ja, ich bin mir sicher"
          className="custom-delete"
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}
