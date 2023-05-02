import React, { useState } from 'react'

export default function DropDown(props) {
  const [isOpen, setIsOpen] = useState(false)
  const { options, value, onChange } = props
  const handleChange = (e, option) => {
    setIsOpen(!isOpen)
    onChange(option)
  }
  const handleBlur = (e) => {
    // setIsOpen(false)
  }
  return (
    <div className="w-60 relative" onBlur={handleBlur}>
      <div
        tabIndex={0}
        className={`relative h-10 bg-slate-800 rounded border cursor-pointer border-slate-950 w-full text-white flex pl-2 items-center t-200 ${
          isOpen && 'rounded-b-none border-b-0 hover:bg-slate-700 '
        }}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.text}
      </div>
      <div className="absolute t-10 w-full">
        {isOpen &&
          options
            .filter((i) => i.value != value.value)
            .map((option) => (
              <div
                className=" bg-slate-800 border-slate-950 cursor-pointer h-10 border-l border-r border-b rounded-b text-white flex pl-2 items-center w-full hover:bg-slate-700 t-200"
                onClick={(e) => handleChange(e, option)}
              >
                {option.text}
              </div>
            ))}
      </div>
    </div>
  )
}
