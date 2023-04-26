import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCard } from '../../redux/dataSlice'
import { useSelector } from 'react-redux'

export default function DeleteCardModal(props) {
  const { closeModal, card } = props
  const dispatch = useDispatch()

  const selectedFolderId = useSelector((state) => state.options.selectedFolder)

  const handleDelete = (e) => {
    dispatch(removeCard({ folderId: selectedFolderId, cardId: card.id }))
    closeModal()
  }
  return (
    <div>
      <div className="flex flex-col">
        <span className="text-white mb-5 text-center">
          Bist du dir sicher, dass du die Keycard <br /> löschen möchtest?
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
