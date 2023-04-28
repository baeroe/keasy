import React from 'react'
import { useDispatch } from 'react-redux'
import { removeCard } from '../../redux/dataSlice'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export default function DeleteCardModal(props) {
  const { closeModal, card } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const selectedFolderId = useSelector((state) => state.options.selectedFolder)

  const handleDelete = (e) => {
    dispatch(removeCard({ folderId: selectedFolderId, cardId: card.id }))
    closeModal()
  }
  return (
    <div>
      <div className="flex flex-col">
        <span className="text-white mb-5 text-center">{t('deleteKeycardText')}</span>
        <input
          type="button"
          value={t('yesImSure')}
          className="custom-delete"
          onClick={handleDelete}
        />
      </div>
    </div>
  )
}
