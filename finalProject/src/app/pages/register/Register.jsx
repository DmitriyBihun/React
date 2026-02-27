import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser, loginWithGoogle } from '../../../features/auth/api/authApi';
import { setUser } from '../../../features/auth/model/authSlice';
import { useTranslation } from 'react-i18next';
import style from './Register.module.css'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError(`${t('messages.error.passwordsNotMatch')}`);
            return;
        }

        if (password.length < 6) {
            setError(`${t('messages.error.passwordTooShort')}`);
            return;
        }

        setIsSubmitting(true);

        const result = await registerUser(email, password);

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
        <div className={style.registerContainer}>
            <h1>{t('auth.signup')}</h1>

            {error && (
                <div className={style.errorDiv}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className={style.registerForm}>
                <div >
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

                <div>
                    <label>{t('auth.confirmPassword')}:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        disabled={isSubmitting}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        backgroundColor: isSubmitting ? '#9ca3af' : '#10b981',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }}
                >
                    {isSubmitting ? `${t('auth.signup')}...` : `${t('auth.signup')}`}
                </button>
            </form>

            <div className={style.orDiv}>
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
                <img src="https://www.google.com/favicon.ico" alt="Google" />
                {isSubmitting ? `${t('common.wait')}` : `${t('auth.signupWithGoogle')}`}
            </button>

            <div className={style.signUpTextBox}>
                <p>{t('auth.hasAccount')}{' '}</p>
                <Link to="/login">
                    {t('auth.login')}
                </Link>
            </div>
        </div>
    );
};

export default Register;