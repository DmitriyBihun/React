import { useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { selectAuthUser } from "../../features/auth/api/authSlice";
import { useSignUpMutation } from "../../features/auth/api/authApi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import style from './SignUp.module.css'

function SignUp() {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const user = useSelector(selectAuthUser)
    const [signUp, { isLoading }] = useSignUpMutation()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [displayName, setDisplayName] = useState('')
    const [error, setError] = useState('')

    if (user) {
        return <Navigate to="/products" replace />
    }

    async function handleSignUp(e) {
        e.preventDefault()
        setError('')

        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }
        try {
            await signUp({ email, password, displayName }).unwrap()
            navigate('/products', { replace: true })
        } catch (error) {
            setError(error.message || 'Registration failed')
        }
    }

    return (
        <div className={style.signUpPage}>
            <h1>{t('signUp.title')}</h1>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSignUp}>
                <input type="text" placeholder="Full Name" value={displayName} onChange={e => setDisplayName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Creating account...' : 'Sign Up'}
                </button>

                <p>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
}

export default SignUp;