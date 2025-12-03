import { useState } from 'react'
import './App.css'
import VariableTemperature from './components/VariableTemperature/VariableTemperature';
import Athletes from './components/Athletes/Athletes';
import NavalBattle from './components/NavalBattle/NavalBattle';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VariableTemperature />

      <Athletes />

      <NavalBattle />
    </>
  )
}

export default App
