import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutAdmin from './page/admin/layout/LayoutAdmin'
import AppRoutes from './routes/AppRoutes'

function App() {

  return (
    <BrowserRouter>
       <AppRoutes />
    </BrowserRouter>
  )
}

export default App
