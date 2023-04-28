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
  const [validationSet, setValidationSet] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

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

  const validateForm = () => {
    var result = []
    if (cardName == '') {
      result.push('name')
    }
    if (cardUserName == '') {
      result.push('username')
    }
    if (cardPassword == '') {
      result.push('password')
    }

    setValidationSet(result)
    return result.length === 0
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
            Name:<span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            ref={inputRef}
            type="text"
            name="folderName"
            className={`custom-text mb-5 ${
              validationSet.includes('name') ? '!bg-red-100 !border-red-500 border' : ''
            }`}
            defaultValue={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <label htmlFor="folderName" className="text-gray-400 text-sm">
            Benutzername:<span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            type="text"
            name="folderName"
            className={`custom-text mb-5 ${
              validationSet.includes('username') ? '!bg-red-100 !border-red-500 border' : ''
            }`}
            defaultValue={cardUserName}
            onChange={(e) => setCardUserName(e.target.value)}
          />
          <label htmlFor="folderName" className="text-gray-400 text-sm">
            Passwort:<span className="text-red-500 ml-0.5">*</span>
          </label>
          <input
            type="password"
            name="folderName"
            className={`custom-text mb-5 ${
              validationSet.includes('password') ? '!bg-red-100 !border-red-500 border' : ''
            }`}
            defaultValue={cardPassword}
            onChange={(e) => setCardPassword(e.target.value)}
          />
          <input type="submit" className="custom-submit" value="Speichern" />
        </div>
      </form>
    </div>
  )
}
