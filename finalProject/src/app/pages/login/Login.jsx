import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser, loginWithGoogle } from '../../../features/auth/api/authApi';
import { setUser } from '../../../features/auth/model/authSlice';
import { useTranslation } from 'react-i18next';
import style from './Login.module.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        const result = await loginUser(email, password);

        if (result.success) {
            dispatch(setUser(result.user));
            navigate('/dashboard');
        } else {
            setError(result.error);
        }

        setIsSubmitting(false);
    };

    const handleGoogleLogin = async () => {
        setError('');
        setIsSubmitting(true);

        const result = await loginWithGoogle();

        if (result.success) {
            dispatch(setUser(result.user));
            navigate('/dashboard');
        } else {
            setError(result.error);
        }

        setIsSubmitting(false);
    };

    return (
        <div className={style.loginContainer}>
            <h1>{t('auth.login')}</h1>

            {error && (
                <div className={style.errorBlock}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>{t('auth.email')}:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label>{t('auth.password')}:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        width: '100%',
                        backgroundColor: isSubmitting ? '#9ca3af' : '#7871e5',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isSubmitting ? `${t('auth.login')}...` : `${t('auth.login')}`}
                </button>
            </form>

            <div className={style.orContainer}>
                <div></div>
                <span>{t('auth.or')}</span>
                <div></div>
            </div>

            <button
                onClick={handleGoogleLogin}
                disabled={isSubmitting}
                className={style.googleButton}
                style={{
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                }}
            >
                <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    style={{ width: '1.25rem', height: '1.25rem' }}
                />
                {isSubmitting ? 'Please wait...' : `${t('auth.loginWithGoogle')}`}
            </button>

            <p className={style.loginText}>
                {t('auth.noAccount')}{' '}
                <Link to="/register" className={style.signUpLink}>
                    {t('auth.register')}
                </Link>
            </p>
        </div>
    );
};

export default Login;