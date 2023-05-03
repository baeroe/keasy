import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App'
import Login from './routes/Login'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import { RouterProvider, Navigate, createHashRouter } from 'react-router-dom'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './common/translations'

import './assets/styles/tailwind.css'
import './assets/styles/main.css'
import './assets/styles/animations.css'
import 'react-tooltip/dist/react-tooltip.css'

const router = createHashRouter([
  {
    path: '/',
    element: <Navigate to="/login" />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/app',
    element: <App />
  }
])

var lang = localStorage.getItem('lang')
if (lang == null) {
  lang = 'de'
  localStorage.setItem('lang', lang)
}

i18next.use(initReactI18next).init({
  resources,
  lng: lang,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
