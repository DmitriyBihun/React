import React from 'react'
import { Link } from 'react-router'

export function LoginButton({ to, style }) {
  return (
    <Link to={to} style={{ marginLeft: 20, ...style }}>
      Увійти
    </Link>
  )
}
