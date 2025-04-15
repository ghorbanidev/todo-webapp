import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/App.jsx'
import { store } from './stores/root.store.js'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import EditTask from './pages/EditTask.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/edit/:id' element={<EditTask />} />
          {/* <Route path='/task/:id' element={<ShowTask />} /> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
