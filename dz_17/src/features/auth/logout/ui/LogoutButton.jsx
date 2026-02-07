import React from 'react'
import { useLogout } from '@/features/auth'
import { useNavigate } from 'react-router'

export function LogoutButton({ navigatePath = '/', style }) {
  const { logoutUser } = useLogout()
  const navigate = useNavigate()

  const handleLogout = () => {
    logoutUser()
    navigate(navigatePath)
  }

  return (
    <button onClick={handleLogout} style={{ marginLeft: 10, ...style }}>
      Вийти
    </button>
  )
}
