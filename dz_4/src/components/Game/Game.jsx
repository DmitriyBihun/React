import { useState } from "react";
import NumberField from "./NumberField";
import Player from "./Player";
import clases from "./Game.module.css";

function Game() {

    const [secret] = useState(() => {
        const num = Math.floor(100 + Math.random() * 900)
        return String(num).split('').map(Number)
    })
    const [guessed, setGuessed] = useState([null, null, null])
    const [usedDigits, setUsedDigits] = useState([])
    const [currentPlayer, setCurrentPlayer] = useState(1)
    const [player1Digits, setPlayer1Digits] = useState([])
    const [player2Digits, setPlayer2Digits] = useState([])

    function handleMove(digit, playerId) {
        if (usedDigits.includes(digit)) {
            return; 
        }

        setUsedDigits(prev => [...prev, digit]);

        const newGuessed = [...guessed];
        let found = false;

        secret.forEach((num, index) => {
            if (num === digit) {
                newGuessed[index] = digit; 
                found = true;
            }
        });

        setGuessed(newGuessed);

        if (found) {
            if (playerId === 1) {
                setPlayer1Digits(prev => [...prev, digit]);
            } else {
                setPlayer2Digits(prev => [...prev, digit]);
            }
        }

        if (newGuessed.every(x => x !== null)) {
            alert(`Гравець ${playerId} програв! Він відгадав останню цифру`);
            return;
        }

        setCurrentPlayer(prev => (prev === 1 ? 2 : 1));
    }


    return (
        <section>
            <h1>Гра “Вгадай число”</h1>
            <NumberField guessed={guessed} />
            <div className={clases.players}>
                <Player playerId={1}
                    currentPlayer={currentPlayer}
                    usedDigits={usedDigits}
                    guessedDigits={player1Digits} 
                    onMove={handleMove} />

                <Player playerId={2}
                    currentPlayer={currentPlayer}
                    usedDigits={usedDigits}
                    guessedDigits={player2Digits}
                    onMove={handleMove} />
            </div>
        </section>
    );
}

export default Game;