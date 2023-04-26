import Content from '../components/Content'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import KeasyfileUpdater from '../components/KeasyfileUpdater'
import { useDispatch } from 'react-redux'
import { setTriggerUpdate } from '../redux/optionsSlice'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setTriggerUpdate(true))
    return () => {
      dispatch(setTriggerUpdate(false))
    }
  }, [])

  return (
    <div className="flex flex-col">
      <Topbar />
      <div className="flex h-full">
        <Sidebar />
        <Content />
      </div>
      <KeasyfileUpdater />
    </div>
  )
}

export default App
