import Content from '../components/Content'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

function App() {
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
