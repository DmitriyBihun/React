import { useId, useState, useMemo } from "react";
import ResultDisplay from "./ResultDisplay";
import style from "./Calculator.module.css";

function Calculator() {

    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    const [count, setCount] = useState(0)

    const id_1 = useId()
    const id_2 = useId()

    const getSum = useMemo(() => {
        return a + b
    }, [a, b])

    return (
        <section className={style.calculatorSection}>
            <div className={style.calculatorInputBox}>
                <label htmlFor={id_1}>Перше число:</label>
                <input type="number" id={id_1} value={a} onChange={(e) => setA(Number(e.target.value))} />
            </div>

            <div className={style.calculatorInputBox}>
                <label htmlFor={id_2}>Друге число:</label>
                <input type="number" id={id_2} value={b} onChange={(e) => setB(Number(e.target.value))} />
            </div>

            <ResultDisplay result={getSum} />

            <button onClick={() => setCount(count + 1)} className={style.calculatorBtn}>
                Нажали {count} разів
            </button>
        </section>
    );
}

export default Calculator;