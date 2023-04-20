import Content from '../components/Content'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

import { useNavigate } from 'react-router-dom'
import { Dispatch, useEffect } from 'react'

function App() {
  const navigate = useNavigate()
  useEffect(() => {}, [])

  return (
    <div className="flex flex-col">
      <Topbar />
      <div className="flex h-full">
        <Sidebar />
        <Content />
      </div>
    </div>
  )
}

export default App
