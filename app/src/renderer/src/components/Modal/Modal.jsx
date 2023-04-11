import React, { useRef } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function Modal(props) {
  const { visible, closeModal, content, title } = props

  const handleCloseModal = (e) => {
    e.stopPropagation()
    closeModal()
  }
  return (
    <div>
      {visible && (
        <div className="w-screen h-screen fixed bg-black/50 flex justify-center items-center top-0 left-0">
          <div className="bg-slate-700 rounded border border-slate-950 shadow modal-open-animation">
            <XMarkIcon
              className="h-6 w-6 text-white ml-auto cursor-pointer mt-2 mr-2 hover:scale-125 transition-all duration-200"
              onClick={handleCloseModal}
            />
            <div className="px-8 text-lg text-white">{title}</div>
            <div className="p-8 pt-4">{content}</div>
          </div>
        </div>
      )}
    </div>
  )
}
