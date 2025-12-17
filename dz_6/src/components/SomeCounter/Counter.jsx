import useCounter from "./useCounter";

function Counter() {

    const { count, increment, decrement } = useCounter(5)


    return ( 
        <div>
            <p>Count: {count}</p>
            <div>
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
            </div>
        </div>
     );
}

export default Counter;