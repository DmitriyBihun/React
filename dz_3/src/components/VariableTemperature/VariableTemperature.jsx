import { useState } from "react";
import styles from './VariableTemperature.module.css'

function VariableTemperature() {
    const [temp, setTemp] = useState('')
    
    const tempValue = temp === '' ? styles.ddefault
        : temp < 0 ? styles.white
            : temp <= 10 ? styles.blue
                : temp <= 22 ? styles.green
                    : styles.red

    return (

        <section className={tempValue}>
            <h2>Задача_2</h2>
            <label>
                Введіть температуру:
                <input type="number" value={temp} onChange={(e) => setTemp(Number(e.target.value))} />
            </label>
        </section>

    );
}

export default VariableTemperature;