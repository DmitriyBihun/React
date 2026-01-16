import { useId } from "react";
import style from './ProductFilter.module.css'

function ProductFilter({ filter, onChange }) {

    const id = useId()

    return (
        <div className={style.inputContainer}>
            <label htmlFor={id}>Введіть назву товару:</label>
            <input type="text" id={id} placeholder="Пуховик" value={filter} onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}

export default ProductFilter;