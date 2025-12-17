import { memo } from 'react'

function ResultDisplay({ result }) {
    console.log("ResultDisplay ререндериться");

    return (
        <p>Сума: {result}</p>
    );
}

export default memo(ResultDisplay);