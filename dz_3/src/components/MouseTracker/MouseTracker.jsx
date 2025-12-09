import { useState, useEffect } from "react";

function MouseTracker({ children }) {
    const [pos, setPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        function handler(e) {
            setPos({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener("mousemove", handler);
        return () => window.removeEventListener("mousemove", handler);
    }, []);

    return children(pos);
}

export default MouseTracker;