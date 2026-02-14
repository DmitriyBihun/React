import { useSelector } from 'react-redux';
import { useDeleteProductMutation } from '../api/productApi';
import { selectAuthUser } from '../../../features/auth/api/authSlice';
import { useNavigate } from 'react-router-dom';
import style from './ProductCard.module.css'
import { useAddToCartMutation } from '../../cart/api/cartApi';
import { useAddToFavouritesMutation, useGetFavouritesQuery, useRemoveFromFavouritesMutation } from '../../favourite/api/favouritesApi';


function ProductCard({ product }) {

    const [deleteProduct] = useDeleteProductMutation()
    const [addToCart] = useAddToCartMutation()
    const [addToFavourites] = useAddToFavouritesMutation()
    const [removeFromFavourites] = useRemoveFromFavouritesMutation()

    const user = useSelector(selectAuthUser)
    const navigate = useNavigate()

    const { data: favourites = {} } = useGetFavouritesQuery(user?.uid, { skip: !user || user.role !== 'user' })

    const isFavourite = favourites[product.id] != null

    async function handleDelete(e) {
        await deleteProduct(product.id)
    }
    async function handleAddToCart() {
        if (!user) {
            navigate('/login')
            return
        }
        try {
            await addToCart({
                userId: user.uid,
                productId: product.id,
                productData: {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    description: product.description
                }
            }).unwrap()
            alert('Added to cart.')
        } catch (error) {
            console.error('Failed to add to cart:', error)
        }
    }

    async function handleToggleFavourite() {
        if (!user) {
            navigate('/login')
            return
        }

        if (user.role !== 'user') {
            alert('Only users can add to favourites')
            return
        }

        try {
            if (isFavourite) {
                await removeFromFavourites({
                    userId: user.uid,
                    productId: product.id
                }).unwrap()
            } else {
                await addToFavourites({
                    userId: user.uid,
                    productId: product.id,
                    productData: {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        image: product.image,
                    }
                }).unwrap()
            }
        } catch (error) {
            console.error('Failed to toggle favourite:', error)
        }
    }

    return (
        <div className={style.card}>
            <div className={style.cardImageBox}>
                <img src={product.image} alt={product.title} />
            </div>

            <h3>{product.title}</h3>
            <p>{product.description}</p>

            <div className={style.cardInfo}>
                <strong>Price: ${product.price}</strong>

                <div className={style.cardActions}>
                    {user?.role === 'user' && (
                        <button
                            className={`${style.favoriteBtn} ${isFavourite ? style.active : ''}`}
                            onClick={handleToggleFavourite}
                        >
                            {isFavourite ? '❤️' : '🤍'}
                        </button>
                    )}

                    {user && (
                        <button
                            className={style.cartBtn}
                            onClick={handleAddToCart}
                        >
                            🛒
                        </button>
                    )}

                    {user?.role === 'admin' && (
                        <>
                            <button
                                className={style.editBtn}
                                onClick={() => navigate(`/products/${product.id}/edit`)}
                            >
                                Edit
                            </button>
                            <button
                                className={style.deleteBtn}
                                onClick={handleDelete}
                            >
                                Delete
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

}

export default ProductCard;