import { useState } from 'react'
import './App.css'
import Example from './components/ToggleExample/Example'
import Counter from './components/SomeCounter/Counter'
import SquareCalculator from './components/MemoExample/SquareCalculator'
import Calculator from './components/Calculator/Calculator'
import WidthTask from './components/WidthTask/WidthTask'
import Search from './components/Search/Search'

function App() {

  return (
    <>
      {/* <Example /> */}

      {/* <Counter /> */}

      {/* <SquareCalculator /> */}

      <Calculator />

      <WidthTask />

      <Search />
    </>
  )
}

export default App
