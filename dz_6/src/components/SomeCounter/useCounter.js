import { useState } from "react";

function useCounter(initialValue = 0) {

    const [count, setCount] = useState(initialValue)

    function increment() {
        setCount(prev => prev + 1)
    }
    function decrement() {
        setCount(prev => prev - 1)
    }

    return { count, increment, decrement }

}

export default useCounter;