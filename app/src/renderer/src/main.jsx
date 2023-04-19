import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import Login from './routes/Login'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './assets/styles/tailwind.css'
import './assets/styles/main.css'
import './assets/styles/animations.css'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/',
    element: <App />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
