function SimpleEx({children}) {
    let value = 42
    return ( 
        children(value)
     );
}

export default SimpleEx;