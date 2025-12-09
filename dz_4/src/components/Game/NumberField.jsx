import clases from "./NumberField.module.css";
function NumberField({ guessed }) {
    return (
        <div className={clases.number}>
            {guessed.map((digit, index) => (
                <span key={index}>
                    {digit === null ? "_" : digit}
                </span>
            ))}
        </div>
    );
}

export default NumberField;