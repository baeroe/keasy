import React, { useEffect, useRef, useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useSystemService } from '../services/systemService'
import { useDispatch } from 'react-redux'
import { init } from '../redux/dataSlice'
import { setPath, setPassword } from '../redux/optionsSlice'
import toast, { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'

export default function Login() {
  const systemService = useSystemService()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [validationSet, setValidationSet] = useState([])

  const toastConfig = {
    duration: 2000,
    className: 'bg-red-500 text-white'
  }

  ///////////////////////////////
  // start with focus on input //
  ///////////////////////////////

  const inputRef = useRef(null)
  useEffect(() => {
    setTimeout(() => {
      inputRef.current.focus()
    }, 1)
  }, [])

  ///////////////////////////
  // open or create view //
  ///////////////////////////

  const open = useRef(null)
  const create = useRef(null)

  const switchModeCreate = () => {
    open.current.classList.remove('delay-200')
    open.current.classList.add('disabled-mode')
    create.current.classList.add('delay-200')
    create.current.classList.remove('disabled-mode-right')
  }
  const switchModeOpen = () => {
    create.current.classList.remove('delay-200')
    create.current.classList.add('disabled-mode-right')
    open.current.classList.add('delay-200')
    open.current.classList.remove('disabled-mode')
  }

  /////////////////////
  // create new file //
  /////////////////////

  const [newFilePath, setNewFilePath] = useState('')
  const [createPassword, setCreatePassword] = useState('')
  const [createPasswordConfirm, setCreatePasswordConfirm] = useState('')

  const handleSelectLocation = async (e) => {
    var result = await systemService.selectFolderAsync()
    if (result.canceled) return
    setNewFilePath(result.filePaths[0] + '/keasyfile')
  }

  const handleCreate = async (e) => {
    e.preventDefault()

    validateCreate()

    if (newFilePath === '') {
      toast(t('noSaveLocation'), toastConfig)
      return
    }

    var existing = await systemService.isFileExisting(newFilePath)
    if (existing) {
      toast(t('fileAlreadyExisting'), toastConfig)
      return
    }

    if (createPassword !== createPasswordConfirm) {
      toast(t('pwnotmatching'), toastConfig)
      return
    }

    await systemService.initKeasyFile(newFilePath, createPassword)
    setFilePath(newFilePath)
    switchModeOpen()
  }

  const validateCreate = () => {
    var result = []
    if (createPassword == '') {
      result.push('createPassword')
    }
    if (createPasswordConfirm == '') {
      result.push('createPasswordConfirm')
    }

    setValidationSet(result)
    return result.length === 0
  }

  //////////////////////////
  // open file and open //
  //////////////////////////
  const [filePath, setFilePath] = useState(localStorage.getItem('lastKeasyfile') || '')
  const [openPassword, setOpenPassword] = useState('')

  const handleSelectFile = async (e) => {
    var result = await systemService.selectFileAsync()
    if (result.canceled) return

    localStorage.setItem('lastKeasyfile', result.filePaths[0])
    setFilePath(result.filePaths[0])
  }

  const handleOpen = async (e) => {
    e.preventDefault()

    validateOpen()
    var exists = await systemService.isFileExisting(filePath)
    if (!exists) {
      toast(t('fileNotExisting'), toastConfig)
      setFilePath('')
      setOpenPassword('')
      return
    }
    var result = await systemService.readKeasyFile(filePath, openPassword)
    if (!result.success) {
      toast(t('wrongPw'), toastConfig)
      setOpenPassword('')
      return
    }

    dispatch(init(result.data))
    dispatch(setPath(filePath))
    dispatch(setPassword(openPassword))

    navigate('/app')
  }

  const validateOpen = () => {
    var result = []
    if (createPassword == '') {
      result.push('openPassword')
    }

    setValidationSet(result)
    return result.length === 0
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-900 text-white justify-center items-center ">
      {/* select */}
      <div
        ref={open}
        className="bg-slate-800 p-10 absolute shadow border border-slate-950 rounded t-500"
      >
        <div className="flex flex-col text-center w-80">
          <h1 className="mb-8 text-2xl">{t('welcome')}</h1>
          <form className="flex flex-col text-center" onSubmit={handleOpen}>
            <label className="text-xs mb-1 text-left">{t('selectKeasyfile')}</label>
            <input
              type="button"
              className=" border-slate-950 bg-slate-600 text-xs rounded py-1 px-2 mb-3 cursor-pointer t-200 hover:scale-105 text-left"
              value={filePath}
              onClick={handleSelectFile}
            />
            <label className="text-xs mb-1 text-left">{t('enterPwForDecryption')}</label>
            <input
              ref={inputRef}
              type="password"
              className={`custom-text ! w-full mb-6 ${
                validationSet.includes('openPassword') ? '!bg-red-100 !border-red-500 border' : ''
              }`}
              defaultValue={openPassword}
              onChange={(e) => setOpenPassword(e.target.value)}
            />
            <input type="submit" className="custom-submit cursor-pointer mb-10" value={t('open')} />
          </form>
          <span className="text-sm mb-3">{t('orCreateNew')}</span>
          <input
            type="button"
            className="custom-submit cursor-pointer"
            value={t('create')}
            onClick={() => switchModeCreate()}
          />
        </div>
        <div className="absolute top-0 placement-logo">
          <div className="w-20 h-20 rounded-full bg-white border border-slate-950 shadow text-black text-center p-5 text-3xl">
            K
          </div>
        </div>
      </div>

      {/* create */}
      <div
        ref={create}
        className="bg-slate-800 p-10 absolute shadow border border-slate-950 rounded t-500 disabled-mode-right"
      >
        <ArrowLeftIcon
          onClick={() => switchModeOpen()}
          className="h-6 w-6 text-gray-500 hover:scale-110 hover:text-gray-400 t-200 cursor-pointer"
        />

        <form className="flex flex-col w-80" onSubmitCapture={handleCreate}>
          <h1 className="mb-8 text-2xl text-center mt-5">{t('createNew')}</h1>
          <label className="text-xs mb-1">{t('selectLocation')}</label>
          <input
            type="button"
            className=" border-slate-950 bg-slate-600 text-xs rounded py-1 px-2 mb-3 cursor-pointer t-200 hover:scale-105 text-left"
            value={newFilePath}
            onClick={handleSelectLocation}
          />
          <label className="text-xs mb-1">{t('enterPwForEncryption')}</label>
          <input
            type="password"
            className={`custom-text !w-full mb-3 ${
              validationSet.includes('createPassword') ? '!bg-red-100 !border-red-500 border' : ''
            }`}
            value={createPassword}
            onChange={(e) => setCreatePassword(e.target.value)}
          />
          <label className="text-xs mb-1">{t('confirmPw')}</label>
          <input
            type="password"
            className={`custom-text !w-full mb-5 ${
              validationSet.includes('createPasswordConfirm')
                ? '!bg-red-100 !border-red-500 border'
                : ''
            }`}
            value={createPasswordConfirm}
            onChange={(e) => setCreatePasswordConfirm(e.target.value)}
          />
          <input type="submit" className="custom-submit" value={t('create')} />
        </form>
      </div>
      <Toaster />
    </div>
  )
}
