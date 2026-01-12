
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'

function App() {

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
