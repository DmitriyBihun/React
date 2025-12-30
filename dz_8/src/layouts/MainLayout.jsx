import { Outlet } from 'react-router'
import Header from './components/Header'
import Footer from './components/Footer'
import styles from './MainLayout.module.css'

function MainLayout() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
