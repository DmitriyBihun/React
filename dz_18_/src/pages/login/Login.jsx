import { useState } from "react";
import { useGoogleLoginMutation, useLoginMutation } from "../../features/auth/api/authApi";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../features/auth/api/authSlice";
import { useTranslation } from "react-i18next";
import style from './Login.module.css'

function Login() {
    const { t } = useTranslation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [login, { isLoading, error }] = useLoginMutation()
    const [googleLogin] = useGoogleLoginMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useSelector(selectAuthUser)

    if (user) {
        return <Navigate to='/products' replace />
    }

    async function handleLogin(e) {
        e.preventDefault()
        try {
            await login({ email, password }).unwrap()
            navigate('/products', { replace: true })
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    async function handleGoogleLogin() {
        try {
            await googleLogin().unwrap()
            navigate('/products', { replace: true })
        } catch (error) {
            console.error('Google login failed:', error)
        }
    }

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>{t('login.title')}</h1>

            <form onSubmit={handleLogin}>
                <div>
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" disabled={isLoading}>
                    Login
                </button>
            </form>

            <hr />

            <div className={style.actions}>
                <button onClick={handleGoogleLogin}>
                    Login with Google
                </button>

                <p>
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </p>
            </div>

            {error && <p style={{ color: 'red' }}>{error.message}</p>}
        </div>
    )
}

export default Login;