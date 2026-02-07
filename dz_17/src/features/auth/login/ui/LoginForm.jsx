import React, { useState } from 'react'
import { useLogin } from '../model/useLogin'
import { useNavigate } from 'react-router'
import { frontRoutes } from '@/shared/config/routes/frontRoutes'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error } = useLogin()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    const result = await login({ email, password })
    if (result.user) navigate(frontRoutes.pages.HomePage.navigationPath)
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        Увійти
      </button>
      {error && (
        <div style={{ color: 'red' }}>
          {error.data?.message || 'Помилка входу'}
        </div>
      )}
    </form>
  )
}
