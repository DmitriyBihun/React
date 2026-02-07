import { LogoutButton } from '@/features/auth/logout/ui/LogoutButton'
import { LoginButton } from '@/features/auth/login/ui/LoginButton'
import { useSelector } from 'react-redux'
import { selectAuthUser } from '@/features/auth/api/authSlice'
import { frontRoutes } from '@/shared/config/routes/frontRoutes'

export function UserInfo() {
  const user = useSelector(selectAuthUser)

  if (!user) {
    return <LoginButton to={frontRoutes.pages.LoginPage.navigationPath} />
  }
  return (
    <div style={{ marginLeft: 20, color: 'gray' }}>
      <span>
        {user.name} ({user.role})
      </span>
      <LogoutButton navigatePath={frontRoutes.pages.LoginPage.navigationPath} />
    </div>
  )
}
