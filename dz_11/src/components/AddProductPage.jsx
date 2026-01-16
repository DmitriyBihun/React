import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addProduct } from '../redux/slices/productsSlice';
import style from './AddProductPage.module.css'

function AddProductPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        image: '',
        name: '',
        price: '',
        concern: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!product.image || !product.name || !product.price || !product.concern) {
            alert('Заповніть всі поля');
            return;
        }

        const productToAdd = {
            ...product,
            price: Number(product.price)
        };

        dispatch(addProduct(productToAdd));
        navigate('/products');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className={style.addContainer}>
            <h1 className={style.header}>Додати новий товар</h1>

            <form onSubmit={handleSubmit} className={style.form}>
                <div className={style.inputBox}>
                    <label>Посилання на зображення:</label>
                    <input
                        type="url"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        required
                    />
                </div>

                <div className={style.inputBox}>
                    <label>Назва товару:</label>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Пуховик ADIDAS Z.N.E. Puffer Climawarm"
                        required
                    />
                </div>

                <div className={style.inputBox}>
                    <label>Ціна:</label>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="7999"
                        min="0"
                        required
                    />
                </div>

                <div className={style.inputBox}>
                    <label>Бренд (concern):</label>
                    <input
                        type="text"
                        name="concern"
                        value={product.concern}
                        onChange={handleChange}
                        placeholder="adidas"
                        required
                    />
                </div>

                <div className={style.buttons}>
                    <button type="submit" className={style.buttonAdd}>
                        Додати товар
                    </button>

                    <button type="button" onClick={() => navigate('/products')} className={style.buttonBack}>
                        Назад
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProductPage;