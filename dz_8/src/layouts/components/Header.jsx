import { NavLink } from 'react-router'
import frontRoutes from '../../routes/frontRoutes'
import styles from './Header.module.css'

function Header() {
  return (
    <header className={styles.container}>
      <NavLink
        to={frontRoutes.pages.home}
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        Головна
      </NavLink>
      <NavLink
        to={frontRoutes.pages.teachers.root}
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        Вчителі
      </NavLink>
      <NavLink
        to={frontRoutes.pages.meeting}
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        Збори
      </NavLink>
      <NavLink
        to={frontRoutes.pages.aboutApp}
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        Про додаток
      </NavLink>
      <NavLink
        to={frontRoutes.pages.aboutDev}
        className={({ isActive }) => (isActive ? styles.active : '')}
      >
        Про розробника
      </NavLink>
    </header>
  )
}

export default Header
