import { useState } from "react";

function TaskForm({ addTask }) {
    const [text, setText] = useState('')

    function handleChange(e) {
        setText(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (text.trim() === '') return
        addTask(text)           /*---- визиваємо коллбек батька */
        setText('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Задача:
                <input type="text" value={text} onChange={handleChange} />
            </label>
            <button type="submit">Додати</button>
        </form>
    );
}

export default TaskForm;