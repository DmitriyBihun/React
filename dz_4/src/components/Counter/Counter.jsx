import { useState } from "react";
import CounterDisplay from "./CounterDisplay";
import CounterControls from "./CounterControls";

function Counter() {
    const [count, setCount] = useState(0)

    function increment() {
        setCount(prev => prev + 1)
    }
    function decrement() {
        setCount(prev => prev - 1)
    }

    return (
        <section>
            <CounterDisplay value={count} />
            <CounterControls onPlus={increment} onMinus={decrement} />
        </section>
    );
}

export default Counter;