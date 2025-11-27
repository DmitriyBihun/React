import { useState } from 'react'
import './App.css'
import LoginCheck from './components/LoginCheck/LoginCheck'
import PopularApplications from './components/PopularApplications/PopularApplications'
import EnglishTrainer from './components/EnglishTrainer/EnglishTrainer'

function App() {

  return (
    <>
      <LoginCheck />

      <PopularApplications />

      <EnglishTrainer />
    </>
  )
}



export default App
