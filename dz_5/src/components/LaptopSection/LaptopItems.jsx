import LaptopItem from "./LaptopItem";
import style from "./LaptopItems.module.css";


function LaptopItems({ laptopList, onAddToCart }) {
    return ( 
        <div className={style.items}>
            {laptopList.map(item => (
                <LaptopItem 
                key={item.id}
                {...item}
                onAddToCart={onAddToCart}
                />
            ))}
        </div>
     );
}

export default LaptopItems;