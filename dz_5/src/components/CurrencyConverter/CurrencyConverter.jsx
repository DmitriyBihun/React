import { useEffect, useState } from "react";
import style from './CurrencyConverter.module.css'

function CurrencyConverter() {
    const [currency, setCurrency] = useState('USD')
    const [exchangeRate, setExchangeRate] = useState(null)
    const [amount, setAmount] = useState(1)
    const [result, setResult] = useState(0)

    useEffect(() => {

        async function fetcExchangeRate() {
            try {
                const day = new Date()
                const today = day.toISOString().split('T')[0].replace(/-/g, '')
                const url = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&date=${today}&json`

                const response = await fetch(url)
                const data = await response.json()

                if (data.length > 0) setExchangeRate(data[0].rate)
                else setExchangeRate(null)
            }
            catch (error) {
                console.error('Помилка запиту', error)
            }
        }
        fetcExchangeRate()

    }, [currency])

    function convert() {
        if (exchangeRate !== null) {
            setResult((amount * exchangeRate).toFixed(2))
        }
    }

    function clear() {
        setAmount(0)
        setResult(0)
    }

    return (
        <section className={style.converter}>
            <h2>Конвертер валют</h2>

            <div className={style.converterSelectBox}>
                <label>Валюта:</label>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                    <option value="PLN">PLN</option>
                </select>
            </div>

            <div className={style.converterInputBox}>
                <label>
                    Сума:
                    <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
                </label>
            </div>

            <div className={style.converterButtons}>
                <button onClick={convert}>Конвертувати</button>
                <button onClick={clear}>Очистити</button>
            </div>

            <p className={style.converterResult}>Result: {result}</p>
        </section>
    );
}

export default CurrencyConverter;