import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/App.css'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>Hello World</div>
    </>
  )
}

export default App
