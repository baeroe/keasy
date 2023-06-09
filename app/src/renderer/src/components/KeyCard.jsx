import React, { useState } from 'react'
import { StarIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { updateCard } from '../redux/dataSlice'
import { EyeSlashIcon } from '@heroicons/react/24/outline'
import { EyeIcon } from '@heroicons/react/24/outline'
import { useSystemService } from '../services/systemService'
import { useTranslation } from 'react-i18next'
import toast, { Toaster } from 'react-hot-toast'
import Spacer from './Spacer'

export default function KeyCard(props) {
  const systemService = useSystemService()
  const { handleEditCard, handleDeleteCard, card } = props
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const selectedFolder = useSelector((state) => state.options.selectedFolder)

  const toastConfig = {
    duration: 2000,
    className: 'bg-slate-700 text-white'
  }

  const handleSetFav = () => {
    dispatch(
      updateCard({
        folderId: selectedFolder,
        card: { ...card, fav: !card.fav }
      })
    )
  }

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(card.password)
    toast(t('passwordCopied'), { ...toastConfig, icon: '🔑' })
  }

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(card.username)
    toast(t('usernameCopied'), { ...toastConfig, icon: '👤' })
  }

  const handleMinimizeAndPaste = async () => {
    await systemService.minimizeAndPasteCredentials(card)
  }

  const handleSetPwVisible = (e) => {
    setPwVisible(!pwVisible)
    e.stopPropagation()
  }

  const [pwVisible, setPwVisible] = useState(false)
  return (
    <div className="bg-slate-700 text-white w-full rounded shadow border border-slate-950 flex">
      <div className="p-2 w-card-content shadow">
        <div className="w-full truncate">{card.name}</div>

        <Spacer />

        <div className="flex flex-col">
          <div
            className="text-sm py-1 px-2 bg-slate-800 border border-slate-950 rounded cursor-pointer truncate hover:scale-105 t-200"
            onClick={handleCopyUsername}
          >
            {card.username}
          </div>
        </div>

        <Spacer />

        <div className="flex flex-col">
          <div
            className="text-sm py-1 px-2 bg-slate-800 border border-slate-950 rounded cursor-pointer flex justify-between items-center hover:scale-105 t-200"
            onClick={handleCopyPassword}
          >
            {pwVisible ? <div className="truncate">{card.password}</div> : <div>********</div>}
            {pwVisible ? (
              <EyeSlashIcon
                className="h-5 w-5 text-gray-500 hover:text-gray-300 t-200"
                onClick={handleSetPwVisible}
              />
            ) : (
              <EyeIcon
                className="h-5 w-5 text-gray-500 hover:text-gray-300 t-200"
                onClick={handleSetPwVisible}
              />
            )}
          </div>
        </div>

        <div className="mt-5">
          <input
            type="button"
            value={t('paste')}
            className="bg-blue-500 py-1 px-2 rounded text-white text-sm cursor-pointer hover:bg-blue-400 hover:scale-105 t-200"
            onClick={handleMinimizeAndPaste}
          />
        </div>
      </div>
      <div className="bg-slate-800 w-12 flex flex-col border-l border-slate-500 rounded-r justify-evenly">
        <div
          onClick={handleSetFav}
          className="flex justify-center items-center hover:flex-grow hover:bg-yellow-500/10 cursor-pointer t-200 py-2 group"
        >
          {card.fav ? (
            <StarIconSolid className="h-6 w-6 text-yellow-500 t-200" />
          ) : (
            <StarIcon className="h-6 w-6 text-gray-500 group-hover:text-yellow-500 t-200" />
          )}
        </div>
        <div
          className="flex justify-center items-center hover:flex-grow hover:bg-blue-500/10 cursor-pointer t-200 py-2 group"
          onClick={() => handleEditCard({})}
        >
          <PencilIcon className="h-6 w-6 text-gray-500 group-hover:text-blue-500 t-200" />
        </div>
        <div
          className="flex justify-center items-center hover:flex-grow hover:bg-red-500/10 cursor-pointer t-200 py-2 group"
          onClick={handleDeleteCard}
        >
          <TrashIcon className="h-6 w-6 text-gray-500 group-hover:text-red-500 t-200" />
        </div>
      </div>
      <Toaster />
    </div>
  )
}
