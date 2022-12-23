import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import './styles.css'
import { CalendarApp } from './CalendarApp'
import { Provider } from 'react-redux'
import { store } from './store'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store} >
        {/* <HashRouter> */}
          <BrowserRouter>
            <CalendarApp />
          </BrowserRouter>
        {/* </HashRouter> */}
    </Provider>
  </React.StrictMode>
)
