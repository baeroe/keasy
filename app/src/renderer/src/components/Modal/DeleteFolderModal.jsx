import React from 'react'
import { useDispatch } from 'react-redux'
import { removeFolder } from '../../redux/dataSlice'
import { selectFolder } from '../../redux/optionsSlice'
import { useTranslation } from 'react-i18next'

export default function DeleteFolderModal(props) {
  const { closeModal, visible, folder } = props
  const dispatch = useDispatch()

  const { t } = useTranslation()
  const handleDelete = (e) => {
    dispatch(removeFolder(folder.id))
    dispatch(selectFolder(0))
    closeModal()
  }

  return (
    <div>
      <div className="flex flex-col">
        <span className="text-white mb-5 text-center">{t('deleteFolderText')}</span>
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
