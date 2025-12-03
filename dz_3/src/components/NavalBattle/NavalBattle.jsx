import { useState } from "react";
import "./NavalBattle.css";

function NavalBattle() {

    const generateField = () => {
        const field = [];
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 5; col++) {
                field.push({
                    id: row * 5 + col + 1,
                    row,
                    col,
                    hasShip: Math.random() < 0.2 ? 1 : 0,
                    isHit: false,
                });
            }
        }
        return field;
    };

    const [gameField, setGameField] = useState(generateField);
    const [history, setHistory] = useState([]);
    const shipsCount = gameField.filter(cell => cell.hasShip).length;

    function getCellClass(cell) {
        if (cell.isHit) return cell.hasShip ? "hit-ship" : "miss";
        return "cell";
    };

    function onCellClick(cellId) {
        setHistory((prev) => [...prev, JSON.parse(JSON.stringify(gameField))]);

        setGameField((prev) =>
            prev.map((cell) =>
                cell.id === cellId ? { ...cell, isHit: true } : cell
            )
        );
    };

    function onRevert() {
        const last = history.at(-1);
        if (last) {
            setGameField(last);
            setHistory((prev) => prev.slice(0, -1));
        }
    };

    const isGameOver = gameField.filter(cell => cell.hasShip)
        .every(ship => ship.isHit === true)

    return (
        <section>
            <h2>Задача_11</h2>
            <p>Кораблів на полі: {shipsCount}</p>
            <table>
                <tbody>
                    {Array.from({ length: 5 }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {gameField
                                .filter((cell) => cell.row === rowIndex)
                                .map((cell) => (
                                    <td
                                        key={cell.id}
                                        className={getCellClass(cell)}
                                        onClick={() => onCellClick(cell.id)}
                                    ></td>
                                ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {isGameOver && <p className="count-ship">Всі кораблі знищені.</p>}

            {history.length > 0 && <button onClick={onRevert}>Revert</button>}
        </section>
    );
}

export default NavalBattle;

