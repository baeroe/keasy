import React, { useState } from 'react'
import { ArrowLeftOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/20/solid'
import Modal from './Modal/Modal'
import SettingsModal from './Modal/SettingsModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setPath, setPassword, selectFolder } from '../redux/optionsSlice'
import { clear } from '../redux/dataSlice'
import { useTranslation } from 'react-i18next'

export default function Topbar() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const handleLogOut = () => {
    dispatch(setPath(''))
    dispatch(setPassword(''))
    dispatch(selectFolder(0))
    dispatch(clear())
    navigate('/login')
  }
  return (
    <div>
      <div className="w-screen h-12 bg-slate-600 shadow border-b border-slate-950">
        <div></div>
        <div className="flex flex-row-reverse items-center h-full pr-4">
          <ArrowLeftOnRectangleIcon className="h-8 w-8 topbar-btn" onClick={handleLogOut} />
          <Cog6ToothIcon
            className="h-8 w-8 topbar-btn mr-2"
            onClick={() => setSettingsOpen(true)}
          />
        </div>
      </div>

      {/* settings modal */}
      <Modal
        visible={settingsOpen}
        closeModal={() => setSettingsOpen(false)}
        title={t('settings')}
        content={<SettingsModal closeModal={() => setSettingsOpen(false)} />}
      />
    </div>
  )
}
