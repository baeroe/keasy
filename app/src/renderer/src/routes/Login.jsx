import React, { useRef, useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useSystemService } from '../services/systemService'
import { useDispatch, useSelector } from 'react-redux'
import { init } from '../redux/dataSlice'
import { setPath, setPassword } from '../redux/optionsSlice'

import { useNavigate } from 'react-router-dom'

export default function Login() {
  const systemService = useSystemService()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const options = useSelector((state) => state.options)
  const data = useSelector((state) => state.data)

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
    if (createPassword !== createPasswordConfirm) {
      alert('Passwörter müssen übereinstimmen')
      return
    }

    var result = await systemService.initKeasyFile(newFilePath, createPassword)
    setFilePath(newFilePath)
    switchModeOpen()
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
    var result = await systemService.readKeasyFile(filePath, openPassword)
    if (!result.success) {
      alert('Wrong password')
      return
    }

    dispatch(init(result.data))
    dispatch(setPath(filePath))
    dispatch(setPassword(openPassword))

    navigate('/app')
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-900 text-white justify-center items-center ">
      {/* init */}
      <div
        ref={open}
        className="bg-slate-800 p-10 absolute shadow border border-slate-950 rounded t-500"
      >
        <div className="flex flex-col text-center w-80">
          <h1 className="mb-8 text-2xl">Wilkommen bei Keasy</h1>

          <label className="text-xs mb-1 text-left">Wähle dein Keasyfile aus</label>
          <input
            type="button"
            className=" border-slate-950 bg-slate-600 text-xs rounded py-1 px-2 mb-3 cursor-pointer t-200 hover:scale-105 text-left"
            value={filePath}
            onClick={handleSelectFile}
          />
          <label className="text-xs mb-1 text-left">Gib dein Passwort zum Entschlüsseln ein</label>
          <input
            type="password"
            className="custom-text !w-full mb-6"
            value={openPassword}
            onChange={(e) => setOpenPassword(e.target.value)}
          />
          <input
            type="button"
            className="custom-submit cursor-pointer mb-10"
            value="Öffnen"
            onClick={handleOpen}
          />
          <span className="text-sm mb-3">oder erstelle ein neues Keasyfile</span>
          <input
            type="button"
            className="custom-submit cursor-pointer"
            value="Erstellen"
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
          <h1 className="mb-8 text-2xl text-center mt-5">Create a new keasyfile</h1>
          <label className="text-xs mb-1">Select a location for your keasyfile</label>
          <input
            type="button"
            className=" border-slate-950 bg-slate-600 text-xs rounded py-1 px-2 mb-3 cursor-pointer t-200 hover:scale-105 text-left"
            value={newFilePath}
            onClick={handleSelectLocation}
          />
          <label className="text-xs mb-1">Enter the password for encryption</label>
          <input
            type="password"
            className="custom-text !w-full mb-3"
            value={createPassword}
            onChange={(e) => setCreatePassword(e.target.value)}
          />
          <label className="text-xs mb-1">Confirm the password</label>
          <input
            type="password"
            className="custom-text !w-full mb-5"
            value={createPasswordConfirm}
            onChange={(e) => setCreatePasswordConfirm(e.target.value)}
          />
          <input type="submit" className="custom-submit" value="Create" />
        </form>
      </div>
    </div>
  )
}
