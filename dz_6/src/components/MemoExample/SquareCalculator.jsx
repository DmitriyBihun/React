// import { useState, useMemo } from "react";

// function ExpensiveComponent() {
//     const [number, setNumber] = useState(1);
//     const [count, setCount] = useState(0);

//     function heavyCalculation(num) {
//         console.log("Вычисляем...");
//         let result = 0;
//         for (let i = 0; i < 1_000_000_000; i++) {
//             result += num;
//         }
//         return result;
//     }

//     const result = useMemo(() => heavyCalculation(number), [number]);

//     return (
//         <div>
//             <input
//                 type="number"
//                 value={number}
//                 onChange={e => setNumber(+e.target.value)}
//             />
//             <p>Счётчик: {count}</p>
//             <button onClick={() => setCount(count + 1)}>Увеличить</button>

//             <div>
//                 <h3>Дорогие вычисления:</h3>
//                 <p>{result}</p>
//             </div>
//         </div>
//     );
// }

// export default ExpensiveComponent;


// ============================================================================

import { useState, useMemo } from "react";

function FilterExample() {
    const [count, setCount] = useState(0);
    const [showEven, setShowEven] = useState(true);

    const numbers = Array.from({ length: 10000 }, (_, i) => i + 1);

    // Фильтрация без useMemo
    const filteredWithoutMemo = numbers.filter(n => showEven ? n % 2 === 0 : n % 2 !== 0);

    // Фильтрация с useMemo
    const filteredWithMemo = useMemo(() => {
        console.log("Фильтруем массив с useMemo...");
        return numbers.filter(n => showEven ? n % 2 === 0 : n % 2 !== 0);
    }, [numbers, showEven]);

    return (
        <div>
            <h2>Фильтрация большого массива</h2>

            <button onClick={() => setShowEven(!showEven)}>
                {showEven ? "Показать нечётные" : "Показать чётные"}
            </button>

            <button onClick={() => setCount(count + 1)}>
                Нажато {count} раз
            </button>

            <div>
                <p>Количество без useMemo: {filteredWithoutMemo.length}</p>
                <p>Количество с useMemo: {filteredWithMemo.length}</p>
            </div>
        </div>
    );
}

export default FilterExample;
