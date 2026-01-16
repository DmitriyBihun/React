import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "../components/ProductFilter";
import { changeFilter } from '../redux/slices/productsSlice'
import { Link } from "react-router";
import ProductList from "../components/ProductList";
import style from './ProductsPage.module.css';

function ProductsPage() {

    const dispatch = useDispatch()
    const { items, filter } = useSelector(state => state.products)

    const filteredProducts = items.filter(product => product.name.toLowerCase().includes(filter.toLowerCase()))

    return (
        <div >
            <h1 className={style.title}>Список товарів</h1>

            <div className={style.content}>
                <div className={style.contentHeader}>
                    <ProductFilter filter={filter} onChange={value => dispatch(changeFilter(value))} />

                    <Link to={'add'} className={style.addLink}> Додати товар </Link>
                </div>
                
                <ProductList products={filteredProducts} />

                {filteredProducts.length === 0 && filter && (<p>Товари "{filter}" не знайдені.</p>)}
            </div>
        </div>
    );
}

export default ProductsPage;