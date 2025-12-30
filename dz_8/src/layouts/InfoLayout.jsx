import { Outlet } from 'react-router'
import GoHomeButton from '../components/GoHomeButton'

function InfoLayout() {
  return (
    <div>
      <div>
        <Outlet />
      </div>
      <GoHomeButton />
    </div>
  )
}

export default InfoLayout
