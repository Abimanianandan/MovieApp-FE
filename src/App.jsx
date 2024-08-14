import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DisplayMovie from './components/DisplayMovie'
import EditMovie from './components/EditMovie'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DisplayMovie />}/>
          <Route path='/:id' element={<EditMovie/>}/>
        </Routes>
      </BrowserRouter>
     
    </>
  )
}

export default App