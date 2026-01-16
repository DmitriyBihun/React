import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Header from './components/Header/Header'
import ProductsPage from './pages/ProductsPage'
import PostsPage from './pages/PostsPage'
import HomePage from './pages/HomePage'
import { Provider } from 'react-redux'
import store from './redux/store'
import AddProductPage from './components/AddProductPage'


function App() {


  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/add" element={<AddProductPage />} />
            <Route path="/posts" element={<PostsPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
