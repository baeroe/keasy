import React, { useEffect, useState } from 'react'
import { PlusIcon } from '@heroicons/react/20/solid'
import Modal from './Modal/Modal'
import EditFolderModal from './Modal/EditFolderModal'
import { TrashIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/outline'
import DeleteFolderModal from './Modal/DeleteFolderModal'
import { useDispatch, useSelector } from 'react-redux'
import { selectFolder } from '../redux/optionsSlice'
import { useTranslation } from 'react-i18next'

export default function Sidebar() {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const folders = useSelector((state) => state.data.folders)
  const selectedFolder = useSelector((state) => state.options.selectedFolder)

  useEffect(() => {
    if (selectedFolder == 0) {
      if (folders.length) {
        dispatch(selectFolder(folders[0].id))
      }
    }
  }, [])

  const [editFolderOpen, setEditFolderOpen] = useState(false)
  const [folderInEdit, setFolderInEdit] = useState(null)

  const [deleteFolderOpen, setDeleteFolderOpen] = useState(false)
  const [folderInDelete, setFolderInDelete] = useState(null)

  const handleEditFolder = (folder) => {
    setFolderInEdit(folder)
    setEditFolderOpen(true)
  }

  const handleDeleteFolder = (folder) => {
    setFolderInDelete(folder)
    setDeleteFolderOpen(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteFolderOpen(false)
    setFolderInDelete(null)
  }

  const handleCloseEditModal = () => {
    setEditFolderOpen(false)
    setFolderInEdit(null)
  }

  const handleSelectFolder = (item) => {
    dispatch(selectFolder(item.id))
  }

  return (
    <div className="flex flex-col h-body overflow-hidden w-60 bg-slate-700 border-r border-slate-950 shadow px-3">
      <span className="text-xs text-slate-500 mt-2 ml-2">{t('folder')}</span>
      {folders.map((item) => (
        <div
          key={item.id}
          className={`sidebar-btn flex justify-between group t-200 ${
            selectedFolder === item.id ? 'bg-slate-600 border border-slate-950 shadow' : ''
          }`}
          onClick={() => handleSelectFolder(item)}
        >
          <div className="truncate">{item.name}</div>
          <div className="hidden justify-center items-center group-hover:flex">
            <PencilIcon
              className="h-5 w-5 hover:text-blue-500 mr-2 t-200"
              onClick={() => handleEditFolder(item)}
            />
            <TrashIcon
              onClick={() => handleDeleteFolder(item)}
              className="h-5 w-5 hover:text-red-500 t-200"
            />
          </div>
        </div>
      ))}
      <div className="sidebar-btn t-200" onClick={() => handleEditFolder(null)}>
        <PlusIcon className="h-6 w-6 text-white mr-2 " />
        {t('newFolder')}
      </div>

      {/* edit/create folder modal */}
      <Modal
        visible={editFolderOpen}
        closeModal={handleCloseEditModal}
        title={folderInEdit ? t('editFolder') : t('newFolder')}
        content={
          <EditFolderModal
            closeModal={() => setEditFolderOpen(false)}
            visible={editFolderOpen}
            folder={folderInEdit}
          />
        }
      />

      {/* delete forlder modal */}
      <Modal
        visible={deleteFolderOpen}
        closeModal={handleCloseDeleteModal}
        title={t('deleteFolder')}
        content={
          <DeleteFolderModal
            closeModal={() => setDeleteFolderOpen(false)}
            visible={deleteFolderOpen}
            folder={folderInDelete}
          />
        }
      />
    </div>
  )
}
