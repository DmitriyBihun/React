import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './app/router/router.jsx'
import StoreProvider from './app/providers/StoreProvider.jsx'
import { AppInit } from './app/init/AppInit.jsx'
import './app/i18n/i18n.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <AppInit>
        <RouterProvider router={router} />
      </AppInit>
    </StoreProvider>
  </StrictMode>,
)
