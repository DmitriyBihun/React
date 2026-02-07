import { useState } from 'react'

function ToggleSection({ children, btnText }) {
    const [showSection, setShowSection] = useState(false)
    return (
        <>
            <button onClick={() => setShowSection((v) => !v)} style={{ marginTop: 10 }}>
                {btnText(showSection)}
            </button>
            {showSection && children}
        </>
    )
}

export default ToggleSection