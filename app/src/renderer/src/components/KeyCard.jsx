import React from 'react'
import { StarIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'
import { PencilIcon } from '@heroicons/react/24/outline'
import Spacer from './Spacer'

export default function KeyCard(props) {
  const { handleEditCard, handleDeleteCard } = props
  return (
    <div className="bg-slate-700 text-white w-full rounded shadow border border-slate-950 flex">
      <div className="p-2 w-full shadow">
        <span>E-Mail GMX</span>

        <Spacer />

        <div className="flex flex-col">
          <span className="text-sm">r.hingerl@gmx.de</span>
        </div>

        <Spacer />

        <div className="flex flex-col">
          <span className="text-sm">**********</span>
        </div>

        <div className="mt-5">
          <input
            type="button"
            value="Einfügen"
            className="bg-blue-500 py-1 px-2 rounded text-white text-sm cursor-pointer hover:bg-blue-400 hover:scale-105 t-200"
          />
        </div>
      </div>
      <div className="bg-slate-800 w-12 flex flex-col border-l border-slate-500 rounded-r justify-evenly">
        <div className="flex justify-center items-center hover:flex-grow hover:bg-yellow-500/10 cursor-pointer t-200 py-2 group">
          <StarIcon className="h-6 w-6 text-gray-500 group-hover:text-yellow-500 t-200" />
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
    </div>
  )
}
