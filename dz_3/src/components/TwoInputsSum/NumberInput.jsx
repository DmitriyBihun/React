function NumberInput({ label, value, onChange }) {

    function handle(e) {
        onChange(e.target.value)
    }

    return ( 
        <label>
            {label}:
            <input type="number" onChange={handle}></input>
        </label>
     );
}

export default NumberInput;