import { useState } from 'react'
import './App.css'
import VariableTemperature from './components/VariableTemperature/VariableTemperature';
import Athletes from './components/Athletes/Athletes';
import NavalBattle from './components/NavalBattle/NavalBattle';
import ProductsList from './components/ProductsList/ProductsList';
import { products } from './data/productsList';
import Greeting from './components/Greeting';
import UserCard from './components/UserCard';
import Example from './components/Example_3/Example';
import Message from './components/Example_3/Message';
import CardList from './components/Cards/CardList';
import MouseTracker from './components/MouseTracker/MouseTracker';
import SimpleEx from './components/SimpleEx/SimpleEx';
import ClickTest from './components/ClickTest/ClickTest';
import InputA from './components/TestLifting/InputA';
import OutputB from './components/TestLifting/OutputB';
import NumberInput from './components/TwoInputsSum/NumberInput';
import SumDisplay from './components/TwoInputsSum/SumDisplay';

function App() {
  const person = { name: 'Alex', age: 28 }
  const [text, setText] = useState("");
  const [a, setA] = useState('')
  const [b, setB] = useState('')

  const sum = (Number(a) || 0) + (Number(b))

  return (
    <>
      <VariableTemperature />

      <Athletes/>

      <NavalBattle />

      <ProductsList products={products} />

      <Greeting name='Dmytro' />

      {/* <UserCard user={person}/> */}

      {/* <Example title={'First block'} Component={Message}/> */}

      <CardList />

      {/* <MouseTracker>
        {({ x, y }) => (
          <h3>Mouse: {x}px, {y}px</h3>
        )}
      </MouseTracker> */}

      <SimpleEx>
        {(num) => <h3>Число з дочірнього ел: {num}</h3>}
      </SimpleEx>

      <ClickTest>
        {n => <h3>3 дочірнього ел: {n}</h3>}
      </ClickTest>

      {/* <div>
        <InputA onTextChange={setText} />
        <OutputB value={text} />
      </div> */}

      <hr />

      <div>
        <h2>Сложение двух чисел (lifting state up)</h2>
        <NumberInput label={'First number'} value={a} onChange={setA}/>
        <NumberInput label={'Second number'} value={b} onChange={setB}/>
        <SumDisplay sum={sum} />
      </div>

    </>
  )
}

export default App
