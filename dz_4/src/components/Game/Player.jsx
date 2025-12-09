import { useState } from "react";
import clases from './Player.module.css'

function Player({ playerId, currentPlayer, usedDigits, guessedDigits, onMove }) {
    const [inputValue, setInputValue] = useState("");

    const isMyTurn = currentPlayer === playerId;

    const isUsed = usedDigits.includes(Number(inputValue));

    function handleClick() {
        const digit = Number(inputValue);

        if (digit < 0 || digit > 9 || isNaN(digit)) {
            alert("Введіть цифру від 0 до 9");
            return;
        }

        onMove(digit, playerId); 
        setInputValue("");      
    }

    return (
        <div className={clases.playerBox}>
            <h3>Гравець {playerId}</h3>

            <div>
                <input className={clases.input}
                    type="number"
                    min="0"
                    max="9"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    disabled={!isMyTurn}
                    placeholder={isMyTurn ? "Введіть цифру" : "Чекайте на хід"}
                />
            </div>

            <button
                onClick={handleClick}
                disabled={!isMyTurn || inputValue === "" || isUsed}
            >
                Зробити хід
            </button>

            <div >
                <strong>Відгадані цифри:</strong>{" "}
                {guessedDigits.length === 0 ? "немає" : guessedDigits.join(", ")}
            </div>
        </div>
    );
}

export default Player;
