function CounterControls({ onPlus, onMinus }) {
    return ( 
        <div>
            <button onClick={onPlus}>+</button>
            <button onClick={onMinus}>-</button>
        </div>
     );
}

export default CounterControls;