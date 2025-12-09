import { useState } from "react";
import clases from './MessageForm.module.css'


function MessageForm({ onAdd }) {
    const [text, setText] = useState('')

    function handleChange(e) {
        setText(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (text.trim() === '') return
        onAdd(text)
        setText('')
    }

    return (
        <form className={clases.form} onSubmit={handleSubmit}>
            <input type="text" className={clases.input}
                value={text}
                onChange={handleChange}
                placeholder="Введіть повідомлення"></input>
            <button type="submit">Відправити</button>
        </form>
    );
}

export default MessageForm;