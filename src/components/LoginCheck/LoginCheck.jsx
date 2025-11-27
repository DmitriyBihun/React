import { useState } from 'react'
import styles from "./LoginCheck.module.css";

export default function LoginCheck() {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    const [color, setColor] = useState('')
    const [isValid, setIsValid] = useState(null)

    function handleSubmit(e) {
        e.preventDefault();

        const finalLogin = login.trim()

        if (finalLogin === 'test') {
            setIsValid(true)
            setMessage('Авторизовано.')
            setColor('green')
        } else {
            setIsValid(false)
            setMessage('Невірний логін')

            if (finalLogin === 'Іван') {
                setColor('blue')
            } else {
                setColor('red')
            }
        }
    }

    return (
        <section className={styles.section}>
            <h2>Задача_1</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                <label>
                    Логін:
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                </label>
                <label>
                    Пароль:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button>Увійти</button>
            </form>

            {isValid === true && <img src='/cool.png' alt='cool' />}

            {isValid === false && <p style={{color}}>{message}</p>}
        </section>
    )
}

// Задача 1. Вводимо логіна і пароль.Якщо логін вірний відображаємо смайл.Якщо ні, то:
// 1) якщо логін = Іван – колір повідомлення про помилку синій
// 2) якщо хтось інший, то колір повідомлення червоний