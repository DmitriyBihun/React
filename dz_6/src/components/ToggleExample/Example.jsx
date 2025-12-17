import useToggle from "./useToggle";

function Example() {

    const [isOpen, toggleIsOpen] = useToggle(false)

    return ( 
        <div>
            <button onClick={toggleIsOpen}>
                {isOpen ? 'Close' : 'Open'}
            </button>

            {isOpen && <p>Content is open</p>}
        </div>
     );
}

export default Example;