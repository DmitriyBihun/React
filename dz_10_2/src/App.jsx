import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Header from './components/Header'
import BusPage from './pages/BusPage'
import HotelPage from './pages/HotelPage'
import BookingPage from './pages/BookingPage'
import { BookingProvider } from './context/BookingContext'

function App() {


  return (
    <>
      <BrowserRouter>
        <BookingProvider>
          <Header />
          <Routes>
            <Route path="/" element={<BusPage />} />
            <Route path="/hotel" element={<HotelPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </BookingProvider>
      </BrowserRouter>
    </>
  )
}

export default App
