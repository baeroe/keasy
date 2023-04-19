import React, { useRef } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

export default function Login() {
  const init = useRef(null)
  const create = useRef(null)

  const switchMode = (to) => {
    init.current.classList.remove('delay-200')
    init.current.classList.add('disabled-mode')
    to.current.classList.add('delay-200')
    to.current.classList.remove('disabled-mode-right')
  }
  const switchModeInit = (from) => {
    from.current.classList.remove('delay-200')
    from.current.classList.add('disabled-mode-right')
    init.current.classList.add('delay-200')
    init.current.classList.remove('disabled-mode')
  }

  const handleCreate = (e) => {
    e.preventDefault()
    console.log(e)
  }

  const handleSelectLocation = async (e) => {
    const dialogConfig = {
      title: 'Select a location',
      buttonLabel: 'Select',
      properties: ['openDirectory', 'createDirectory']
    }
    var result = await electron.ipcRenderer.invoke('dialog', 'showOpenDialog', dialogConfig)
    // .then((result) => console.log(result))
    console.log(result)
  }

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-900 text-white justify-center items-center ">
      {/* init */}
      <div
        ref={init}
        className="bg-slate-800 p-10 absolute shadow border border-slate-950 rounded t-500"
      >
        <div className="flex flex-col text-center w-80">
          <h1 className="mb-8 text-2xl">Wilkommen bei Keasy</h1>

          <label className="text-xs mb-1 text-left">Wähle dein Keasyfile aus</label>
          <input
            type="button"
            className=" border-slate-950 bg-slate-600 text-sm rounded py-1 px-2 mb-3 cursor-pointer t-200 hover:scale-105"
            value=""
            onClick={handleSelectLocation}
          />
          <label className="text-xs mb-1 text-left">Gib dein Passwort zum Entschlüsseln ein</label>
          <input type="password" className="custom-text !w-full mb-6" />
          <input type="button" className="custom-submit cursor-pointer mb-10" value="Öffnen" />
          <span className="text-sm mb-3">oder erstelle ein neues Keasyfile</span>
          <input
            type="button"
            className="custom-submit cursor-pointer"
            value="Erstellen"
            onClick={() => switchMode(create)}
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
          onClick={() => switchModeInit(create)}
          className="h-6 w-6 text-gray-500 hover:scale-110 hover:text-gray-400 t-200 cursor-pointer"
        />

        <form className="flex flex-col w-80" onSubmitCapture={handleCreate}>
          <h1 className="mb-8 text-2xl text-center mt-5">Create a new keasyfile</h1>
          <label className="text-xs mb-1">Select a location for your keasyfile</label>
          <input
            type="button"
            className=" border-slate-950 bg-slate-600 text-sm rounded py-1 px-2 mb-3 cursor-pointer t-200 hover:scale-105"
            value=""
            onClick={handleSelectLocation}
          />
          <label className="text-xs mb-1">Enter the password for encryption</label>
          <input type="password" className="custom-text !w-full mb-3" />
          <label className="text-xs mb-1">Confirm the password</label>
          <input type="password" className="custom-text !w-full mb-5" />
          <input type="submit" className="custom-submit" value="Create" />
        </form>
      </div>
    </div>
  )
}
