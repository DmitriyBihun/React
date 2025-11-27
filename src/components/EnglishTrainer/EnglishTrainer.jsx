import { useState } from 'react'
import styles from "./EnglishTrainer.module.css";
import tableImg from '/src/assets/table.png'

function EnglishTrainer() {
    const [userAnswer, setUserAnswer] = useState('')
    const [message, setMessage] = useState('')
    const [statusAnswer, setStatusAnswer] = useState(null)

    function handleChecker() {
        if (userAnswer.trim().toLowerCase() === 'table') {
            setMessage('Добре. Молодець!')
            setStatusAnswer(true)
        } else {
            setMessage('Невірно, спробуйте ще раз.')
            setStatusAnswer(false)
        }
    }

    return (
        <section className={styles.section}>
            <h2>Задача_3</h2>

            {<div className={statusAnswer === true ? styles.success : statusAnswer === false ? styles.error : ''}>
                <img src={tableImg} className={styles.image}/>
                <span>Стіл</span>
                <label>
                    Ваш переклад:
                    <input type="text" value={userAnswer} onChange={(e) => setUserAnswer(e.target.value)} />
                </label>
                <button onClick={handleChecker}>Перевірити</button>
            </div>}

            <div>{message}</div>
        </section>
    );
}

export default EnglishTrainer;

//  Елемент тренажера англійської.Виводимо зображення елемента і слово.Користувач вводить відповідь.Якщо вірно – відтворюємо фразу «Добре.Молодець!» (і додаємо зелену рамку до елемента), якщо ні - то відтворюємо фразу «Невірно, спробуйте ще раз» (і додаємо червону рамку).