import { useState } from 'react'
import './App.css'
import { laptopSale } from "./data/laptopSale";
import Cart from './components/Cart/Cart';
import LaptopSection from './components/LaptopSection/LaptopSection';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';

function App() {
  const [cartCount, setCartCount] = useState(0);

  function handleAddToCart() {
    setCartCount(prev => prev + 1)
  }

  return (
    <>   
      <LaptopSection title='Задача_3' laptopList={laptopSale} onAddToCart={handleAddToCart} />
      <Cart count={cartCount} />

      <CurrencyConverter />
    </>
  )
}

export default App
