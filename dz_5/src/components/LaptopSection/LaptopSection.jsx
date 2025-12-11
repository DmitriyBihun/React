import LaptopItems from "./LaptopItems";

function LaptopSection({ title, laptopList, onAddToCart }) {
    return (
        <section>
            <h2>
                {title}
            </h2>
            <LaptopItems laptopList={laptopList} onAddToCart={onAddToCart} />
        </section>
    );
}

export default LaptopSection;