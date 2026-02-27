import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store/index';
import { router } from './app/router/router'
import './App.css'
import AuthProvider from './app/providers/AuthProvider';
import AppInit from './app/providers/AppInit'; 
import './app/i18n'

function App() {

  return (
    <Provider store={store}>
      <AuthProvider>
        <AppInit />
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  )
}

export default App
