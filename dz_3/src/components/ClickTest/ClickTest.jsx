import { useState } from "react";

function ClickTest({ children }) {
    const [count, setCount] = useState(0)
    return (
        <div>
            <button onClick={() => setCount(c => c + 1)}>+</button>

            {children(count)}
        </div>
    );
}

export default ClickTest;