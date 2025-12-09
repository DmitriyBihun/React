import { useState } from "react";
import { players } from "./playersData";
import clases from "./Athletes.module.css";

export default function Athletes() {
    const [allPlayers, setAllPlayers] = useState(players)
    const [selectedPlayers, setSelectedPlayers] = useState([])

    function addPlayer(playerId) {
        const playerToAdd = allPlayers.find(player => player.id === playerId);
        const newAllPlayers = allPlayers.filter(player => player.id !== playerId);
        const newSelectedPlayers = [...selectedPlayers, playerToAdd];

        setAllPlayers(newAllPlayers)
        setSelectedPlayers(newSelectedPlayers)
    }

    function removePlayer(playerId) {
        const playerToRemove = selectedPlayers.find(p => p.id === playerId);
        const newSelectedPlayers = selectedPlayers.filter(p => p.id !== playerId);
        const newAllPlayers = [...allPlayers, playerToRemove];

        setSelectedPlayers(newSelectedPlayers)
        setAllPlayers(newAllPlayers)
    }

    return ( 
        <section>
            <h2>Задача_5</h2>
            <div className={clases.container}>
                <div className={clases["all-players"]}>
                    <h2>Загальний список</h2>
                    <ul>
                        {allPlayers.map(player => (
                            <li key={player.id}>{player.name}
                            <button onClick={() => addPlayer(player.id)} className={clases.add}>Add</button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className={clases["selected-players"]}>
                    <h2>Обрані для змагання</h2>
                    <ul>
                        {selectedPlayers.map(player => (
                            <li key={player.id}>{player.name}
                            <button onClick={() => removePlayer(player.id)} className={clases.remove}>Remove</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
     );
}
