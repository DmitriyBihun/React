import { useSelector } from 'react-redux';
import {
    useGetCartQuery,
    useRemoveFromCartMutation,
    useUpdateQuantityMutation,
    useClearCartMutation
} from '../../entities/cart/api/cartApi';
import { selectAuthUser } from '../../features/auth/api/authSlice';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import style from './Cart.module.css';

export default function Cart() {
    const { t } = useTranslation()
    const user = useSelector(selectAuthUser);
    const { data: cart = {}, isLoading } = useGetCartQuery(user?.uid, {
        skip: !user
    });

    const [removeFromCart] = useRemoveFromCartMutation();
    const [updateQuantity] = useUpdateQuantityMutation();
    const [clearCart] = useClearCartMutation();

    const cartItems = Object.entries(cart).filter(([_, item]) => item !== null);

    const totalPrice = cartItems.reduce((sum, [_, item]) => {
        return sum + (item.price * (item.quantity || 1));
    }, 0);

    if (isLoading) return <div>Loading cart...</div>;

    return (
        <div className={style.cart}>
            <h1>{t('cart.title')}</h1>

            {cartItems.length === 0 ? (
                <div className={style.emptyCart}>
                    <p>Your cart is empty.</p>
                    <Link to="/products" className={style.continueShopping}>
                        {t('cart.continueLink')}
                    </Link>
                </div>
            ) : (
                <>
                    <div className={style.cartItems}>
                        {cartItems.map(([productId, item]) => (
                            <div key={productId} className={style.cartItem}>
                                <img src={item.image} alt={item.title} />

                                <div className={style.itemInfo}>
                                    <h3>{item.title}</h3>
                                    <div className={style.priceCount}>
                                        <p>Price: ${item.price}</p>

                                        <div className={style.quantity}>
                                            <button
                                                onClick={() => updateQuantity({
                                                    userId: user.uid,
                                                    productId,
                                                    quantity: Math.max(1, (item.quantity || 1) - 1)
                                                })}
                                            >
                                                -
                                            </button>
                                            <span>{item.quantity || 1}</span>
                                            <button
                                                onClick={() => updateQuantity({
                                                    userId: user.uid,
                                                    productId,
                                                    quantity: (item.quantity || 1) + 1
                                                })}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className={style.itemTotal}>
                                        Total: ${(item.price * (item.quantity || 1)).toFixed(2)}
                                    </div>

                                    <button
                                        className={style.removeBtn}
                                        onClick={() => removeFromCart({
                                            userId: user.uid,
                                            productId
                                        })}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={style.cartSummary}>
                        <h3>Order Summary</h3>
                        <div className={style.total}>
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        <div className={style.buttons}>
                            <button className={style.checkoutBtn}>
                                Proceed to Checkout
                            </button>

                            <button
                                className={style.clearCartBtn}
                                onClick={() => clearCart(user.uid)}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}