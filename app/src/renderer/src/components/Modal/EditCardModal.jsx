import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCard, updateCard } from '../../redux/dataSlice'
import { useSelector } from 'react-redux'

export default function EditCardModal(props) {
  const { closeModal, visible, card } = props
  const dispatch = useDispatch()

  const selectedFolderId = useSelector((state) => state.options.selectedFolder)

  const [cardName, setCardName] = useState(card ? card.name : '')
  const [cardUserName, setCardUserName] = useState(card ? card.username : '')
  const [cardPassword, setCardPassword] = useState(card ? card.password : '')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (card) {
      dispatch(
        updateCard({
          folderId: selectedFolderId,
          card: { ...card, name: cardName, username: cardUserName, password: cardPassword }
        })
      )
      closeModal()
      return
    }
    dispatch(
      addCard({
        folderId: selectedFolderId,
        card: { name: cardName, username: cardUserName, password: cardPassword }
      })
    )
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
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-80">
          <label htmlFor="folderName" className="text-gray-400 text-sm">
            Name:
          </label>
          <input
            ref={inputRef}
            type="text"
            name="folderName"
            className="custom-text mb-5"
            defaultValue={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <label htmlFor="folderName" className="text-gray-400 text-sm">
            Benutzername:
          </label>
          <input
            type="text"
            name="folderName"
            className="custom-text mb-5"
            defaultValue={cardUserName}
            onChange={(e) => setCardUserName(e.target.value)}
          />
          <label htmlFor="folderName" className="text-gray-400 text-sm">
            Passwort:
          </label>
          <input
            type="password"
            name="folderName"
            className="custom-text mb-5"
            defaultValue={cardPassword}
            onChange={(e) => setCardPassword(e.target.value)}
          />
          <input type="submit" className="custom-submit" value="Speichern" />
        </div>
      </form>
    </div>
  )
}
