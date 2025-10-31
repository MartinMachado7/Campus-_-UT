import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom'
import './styles.css'
import { JournalApp } from './journalApp'
import { store } from './store'

// 🔹 Prueba de conexión con Firebase
import { FirebaseAuth as auth } from "./firebase/config";



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <JournalApp />
      </HashRouter>
    </Provider>
  </React.StrictMode>
)
