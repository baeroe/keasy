import React, { useState } from 'react'
import KeyCard from './KeyCard'
import { PlusIcon } from '@heroicons/react/20/solid'
import Modal from './Modal/Modal'
import EditCardModal from './Modal/EditCardModal'
import DeleteCardModal from './Modal/DeleteCardModal'

export default function Content() {
  const [editCardOpen, setEditCardOpen] = useState(false)
  const [cardInEdit, setCardInEdit] = useState(0)

  const handleCloseEditModal = () => {
    setEditCardOpen(false)
    setCardInEdit(null)
  }
  const handleEditCard = (card) => {
    setCardInEdit(card)
    setEditCardOpen(true)
  }

  const [deleteCardOpen, setDeleteCardOpen] = useState(false)
  const [cardInDelete, setCardInDelete] = useState(0)

  const handleCloseDeleteModal = () => {
    setDeleteCardOpen(false)
    setCardInDelete(null)
  }
  const handleDeleteCard = (card) => {
    setCardInDelete(card)
    setDeleteCardOpen(true)
  }
  return (
    <div className="w-full">
      <div className="w-full overflow-scroll h-body p-2 bg-slate-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
          {[1, 2, 3, 4, 5, 6, 7].map((i) => {
            return (
              <KeyCard
                key={i}
                handleEditCard={handleEditCard}
                handleDeleteCard={handleDeleteCard}
              />
            )
          })}
          <div
            onClick={() => setEditCardOpen(true)}
            className="bg-slate-800 hover:bg-slate-700 text-white w-full h-full rounded shadow border border-slate-950 flex justify-center items-center cursor-pointer group transition-all duration-200"
          >
            <PlusIcon className="h-12 w-12 my-12 text-white group-hover:scale-125 transition-all duration-200" />
          </div>
        </div>
      </div>

      <Modal
        visible={editCardOpen}
        closeModal={handleCloseEditModal}
        title={cardInEdit ? 'Keycard bearbeiten' : 'Neue Keycard'}
        content={<EditCardModal inEditId={cardInEdit} visible={editCardOpen} />}
      />

      <Modal
        visible={deleteCardOpen}
        closeModal={handleCloseDeleteModal}
        title="Keycard löschen"
        content={<DeleteCardModal />}
      />
    </div>
  )
}
