import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, fetchProductsByCategory, deleteProductById } from '../../redux/products';
import { fetchFavorites, deleteFavorite, addFavorite } from '../../redux/favorites';
import { NavLink } from 'react-router-dom';
import './Products.css';
import ConfirmDeleteModal from '../ConfirmDeleteModal/ConfirmDeleteModal';
import { FaStar } from 'react-icons/fa';
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa6";
import Carousel from '../HomeBanner';

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => Object.values(state.products.allProducts));
    const favoriteIds = useSelector((state) => state.favorites.favoriteIds); // Favorite product IDs
    const currentUser = useSelector((state) => state.session.user);

        // Transform favoriteIds to just product IDs for easy checks
    const favoriteProductIds = favoriteIds.map(fav => fav.product_id);
    
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);

    const categories = [
        { id: null, name: "All" },
        { id: 1, name: "Marvel" },
        { id: 2, name: "DC" },
    ];


 
    const handleFavoriteToggle = async (e, productId) => {
        e.preventDefault(); // Prevents navigating to the product page on icon click        
        if (favoriteProductIds.includes(productId)) {
            await dispatch(deleteFavorite(productId)); // Remove from favorites if already favorited                       
        } else {           
            await dispatch(addFavorite(productId));
            // await dispatch(fetchFavorites());
           
        }
    };

    useEffect(() => {
        dispatch(fetchFavorites()); // Fetch favorites on initial mount and when `favoriteIds` changes
    }, [dispatch, favoriteIds.length]);

   
    useEffect(() => {
        if (selectedCategory === null){
            dispatch(fetchProducts());
        } else {
            dispatch(fetchProductsByCategory(selectedCategory))
        }
        dispatch(fetchFavorites()); // Load favorites when component mounts
    }, [dispatch, selectedCategory]);



    const handleDelete = async () => {
        if (selectedProductId) {
            await dispatch(deleteProductById(selectedProductId));
            setIsModalOpen(false);
            setSelectedProductId(null);  // Clear selected product ID after delete
        }
    };


    const closeDeleteModal = () => {
        setIsModalOpen(false);
        setSelectedProductId(null);  // Clear selected product ID on modal close
    };

    return (
        <div>

        <Carousel />
        <div className="category-filter">
            {categories.map((category) => (
                <button
                    key={category.id}
                    className={selectedCategory === category.id ? "active" : ""}
                    onClick={() => setSelectedCategory(category.id)}
                >
                   {category.name}
                </button>
            ))}
        </div>

        <div className="products-container">
            
            {products.map((product) => {
                const isFavorited = favoriteProductIds.includes(product.id)               
                return (
                    <div key={product.id} className="product-tile">
                        <div className="image-container">
                            <div className="favorite-icon-container">
                                {currentUser && ( // Check if user is logged in
                                    isFavorited ? (
                                        <FaHeart
                                            className={`favorite-icon favorited`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleFavoriteToggle(e, product.id)
                                            }}
                                        /> ) : (
                                        <CiHeart
                                            className={`favorite-icon`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleFavoriteToggle(e, product)
                                            }}
                                            style={{
                                                fontSize: '2rem',          
                                                color: '#ffffff',             
                                                filter: 
                                                    'drop-shadow(0px 0px 1px black)'                                 
                                            }}
                                        />
                                    )
                                )}
                            </div>    
                            
                            {/* Wrap image with NavLink to make it clickable */}
                            <NavLink to={`/products/${product.id}`}>
                                <img
                                    src={product?.previewImage || '/default-image.jpg'}
                                    alt={product?.name}
                                    className="product-image"
                                />
                            </NavLink>
                        </div>
                        <div className="product-info">
                            <NavLink to={`/products/${product.id}`} className="product-link">
                                <h3>{product?.name}</h3>
                            </NavLink>
                            <div className="product-details">
                                <span className="product-rating">
                                    {product.avgRating ? product?.avgRating.toFixed(1) : 'New'} <FaStar className="single-star" />
                                </span>
                                <div className="product-price">${product?.price}</div>
                            </div>
                        </div>
                    </div>
                )
            })}

            {isModalOpen && (
                <ConfirmDeleteModal
                    onClose={closeDeleteModal}
                    onConfirm={handleDelete}
                    modalValue="product"
                />
            )}
        </div>
        </div>
    );

}

export default Products;