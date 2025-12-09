function Example({ title, Component }) {
    return (
        <div style={{
            border: "1px solid red",
            padding: "10px", 
            margin: "10px"
        }}>
            <h2>{title}</h2>
            <Component />
        </div>
    );
}

export default Example;