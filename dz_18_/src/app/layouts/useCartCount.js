import { useSelector } from 'react-redux';
import { selectAuthUser } from '../../features/auth/api/authSlice';
import { useGetCartQuery } from '../../entities/cart/api/cartApi';

export function useCartCount() {
    const user = useSelector(selectAuthUser);
    const { data: cart = {} } = useGetCartQuery(user?.uid, {
        skip: !user
    });

    if (!user) return 0;

    return Object.values(cart).filter(item => item !== null).length;
}