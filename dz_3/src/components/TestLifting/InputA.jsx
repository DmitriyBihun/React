function InputA({ onTextChange }) {
    function handleChange(e) {
        onTextChange(e.target.value); // отправляем данные вверх
    }

    return <input type="text" onChange={handleChange} />;
}

export default InputA;