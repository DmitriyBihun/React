import { useSelector } from 'react-redux';
import { useGetFavouritesQuery } from '../../entities/favourite/api/favouritesApi';
import { selectAuthUser } from '../../features/auth/api/authSlice';
import { Link } from 'react-router-dom';
import ProductCard from '../../entities/product/ui/ProductCard';
import style from './Favourites.module.css'

export default function Favourites() {
    const user = useSelector(selectAuthUser);
    const { data: favourites = {}, isLoading } = useGetFavouritesQuery(user?.uid);

    const favouriteItems = Object.values(favourites).filter(item => item !== null);

    if (isLoading) return <div>Loading...</div>;

    return (
        <div className={style.favourites}>
            <h1>My Favourites</h1>

            {favouriteItems.length === 0 ? (
                <div>
                    <p>No favourite items yet.</p>
                    <Link to="/products">Browse Products</Link>
                </div>
            ) : (
                    <div className={style.favouriteItems}>
                    {favouriteItems.map(item => (
                        <ProductCard key={item.id} product={item} />
                    ))}
                </div>
            )}
        </div>
    );
}