import React, { useState } from 'react'
import { ArrowLeftOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/20/solid'
import Modal from './Modal/Modal'
import SettingsModal from './Modal/SettingsModal'

export default function Topbar() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  return (
    <div>
      <div className="w-screen h-12 bg-slate-600 shadow border-b border-slate-950">
        <div></div>
        <div className="flex flex-row-reverse items-center h-full pr-4">
          <ArrowLeftOnRectangleIcon className="h-8 w-8 topbar-btn" />
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
        title="Settings"
        content={<SettingsModal />}
      />
    </div>
  )
}
