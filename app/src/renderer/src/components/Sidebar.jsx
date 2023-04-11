import React, { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import Modal from './Modal/Modal'
import EditFolderModal from './Modal/EditFolderModal'
import { TrashIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/outline'

export default function Sidebar() {
  const [menu, setMenu] = useState([
    {
      id: 1,
      name: 'Private',
      icon: 'home'
    },
    {
      id: 2,
      name: 'Work',
      icon: 'office'
    }
  ])
  const [editFolderOpen, setEditFolderOpen] = useState(false)
  const [folderInEdit, setFolderInEdit] = useState(null)

  const handleEditFolder = (folder) => {
    setFolderInEdit(folder)
    setEditFolderOpen(true)
  }

  const handleCloseModal = () => {
    setEditFolderOpen(false)
    setFolderInEdit(null)
  }

  return (
    <div className="flex flex-col h-body overflow-hidden w-60 bg-slate-700 border-r border-slate-950 shadow px-3">
      <span className="text-xs text-slate-500 mt-2 ml-2">Folders</span>
      {menu.map((item) => (
        <div key={item.id} className="sidebar-btn flex justify-between group">
          <span>{item.name}</span>
          <div className="hidden justify-center items-center group-hover:flex">
            <PencilIcon
              className="h-5 w-5 hover:text-blue-500 mr-2 t-200"
              onClick={() => handleEditFolder(item.id)}
            />
            <TrashIcon className="h-5 w-5 hover:text-red-500 t-200" />
          </div>
        </div>
      ))}
      <div className="sidebar-btn" onClick={() => setEditFolderOpen(true)}>
        <PlusIcon className="h-6 w-6 text-white mr-2" />
        New
      </div>

      {/* new folder modal */}
      <Modal
        visible={editFolderOpen}
        closeModal={handleCloseModal}
        title={folderInEdit ? 'Edit folder' : 'New Folder'}
        content={
          <EditFolderModal closeModal={() => setEditFolderOpen(false)} visible={editFolderOpen} />
        }
      />
    </div>
  )
}
