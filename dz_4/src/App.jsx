import { useState } from 'react'
import './App.css'
import Chat from './components/Chat/Chat'
import Counter from './components/Counter/Counter'
import ToDo from './components/ToDo/ToDo'
import Game from './components/Game/Game'

function App() {

  return (
    <>
      <Chat />

      {/* <Counter /> */}

      {/* <ToDo /> */}

      <Game />
    </>
  )
}

export default App
