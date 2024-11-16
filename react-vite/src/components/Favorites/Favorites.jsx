import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavorites, deleteFavorite } from '../../redux/favorites';
import './Favorites.css';
import { NavLink } from 'react-router-dom';
import { FaStar, FaHeart } from 'react-icons/fa';

const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites?.favoriteIds || []);
    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);


    const handleRemoveFavorite = (productId) => {
        dispatch(deleteFavorite(productId));
    };

    return (
        <div className='favorites-container'>
            <div className="products-container">
                {favorites.length > 0 ? (
                    favorites.map((favorite) => (
                        <div key={favorite.product?.id} className="product-tile">
                            <NavLink to={`/products/${favorite.product?.id}`}>
                                <div className="image-container">
                                    <img
                                        src={favorite.product?.previewImage || '/default-image.jpg'}
                                        alt={favorite.product?.name}
                                        className="product-image" 
                                    />
                                    <FaHeart
                                        className="favorite-icon favorited"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleRemoveFavorite(favorite.product?.id);
                                        }}
                                    />
                                </div>
                                <div className="product-details">
                                    <div className="product-details-wrapper">
                                        <h3>{favorite.product?.name}</h3>
                                        <span className="product-rating">
                                            {favorite.product.avgRating ? favorite.product?.avgRating?.toFixed(1) : 'New'} <FaStar className="single-star" />
                                        </span>
                                    </div>
                                    <div className="product-price">${favorite.product?.price}</div>
                                </div>
                            </NavLink>
                        </div>
                    ))
                ) : (
                    <p>No favorites yet!</p>
                )}
            </div>
        </div>
    );
};

export default Favorites;


