import React, { useEffect, useState } from 'react'
import KeyCard from './KeyCard'
import { PlusIcon } from '@heroicons/react/20/solid'
import Modal from './Modal/Modal'
import EditCardModal from './Modal/EditCardModal'
import DeleteCardModal from './Modal/DeleteCardModal'
import { useSelector } from 'react-redux'

export default function Content() {
  const [editCardOpen, setEditCardOpen] = useState(false)
  const [cardInEdit, setCardInEdit] = useState(null)

  const folders = useSelector((state) => state.data.folders)
  const selectedFolderId = useSelector((state) => state.options.selectedFolder)
  const [cards, setCards] = useState([])

  useEffect(() => {
    var selectedFolder = folders.filter((f) => f.id === selectedFolderId)[0]

    if (!selectedFolder) {
      setCards([])
      return
    }

    var sortedCards = [...selectedFolder.cards].sort((a, b) => {
      if (a.fav && !b.fav) {
        return -1
      }
      if (!a.fav && b.fav) {
        return 1
      }
      return 0
    })

    setCards(sortedCards)
  }, [selectedFolderId, folders])

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
          {cards.map((card) => {
            return (
              <KeyCard
                key={card.id}
                card={card}
                handleEditCard={() => handleEditCard(card)}
                handleDeleteCard={() => handleDeleteCard(card)}
              />
            )
          })}
          {selectedFolderId && (
            <div
              onClick={() => setEditCardOpen(true)}
              className="bg-slate-800 hover:bg-slate-700 text-white w-full h-full rounded shadow border border-slate-950 flex justify-center items-center cursor-pointer group transition-all duration-200"
            >
              <PlusIcon className="h-12 w-12 my-12 text-white group-hover:scale-125 transition-all duration-200" />
            </div>
          )}
        </div>
      </div>

      <Modal
        visible={editCardOpen}
        closeModal={handleCloseEditModal}
        title={cardInEdit ? 'Keycard bearbeiten' : 'Neue Keycard'}
        content={
          <EditCardModal
            card={cardInEdit}
            visible={editCardOpen}
            closeModal={handleCloseEditModal}
          />
        }
      />

      <Modal
        visible={deleteCardOpen}
        closeModal={handleCloseDeleteModal}
        title="Keycard löschen"
        content={<DeleteCardModal closeModal={handleCloseDeleteModal} card={cardInDelete} />}
      />
    </div>
  )
}
