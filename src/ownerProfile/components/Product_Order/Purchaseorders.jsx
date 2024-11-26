import React, { useState, useEffect } from 'react';
import './ProductPage.css'; // Importing the CSS file
import { useNavigate } from 'react-router-dom';
import { notify } from '../../../services/errorHandlingService';


const products = [
    { id: 1, name: 'Listing', description: 'Get an ad slot for 30 days to post your listing', price: 3000, icon: 'fas fa-ad text-green-500' },
    { id: 2, name: 'Hot Listing', description: 'Get an ad slot for 30 days and place your ad above normal listings', price: 7800, icon: 'fas fa-fire text-orange-500' },
    { id: 3, name: 'Super Hot Listing', description: 'Get an ad slot for 30 days and place your ad at the top of search results', price: 21000, icon: 'fas fa-fire-alt text-red-500' },
    { id: 4, name: 'Refresh Credits', description: 'Refresh the time of your posted listings and bring them to the top again', price: 240, icon: 'fas fa-sync-alt text-blue-500' },
    { id: 5, name: 'Story Ad Credits', description: 'Get more exposure by posting your listing in the story', price: 1000, icon: 'fas fa-bookmark text-green-500' },
    { id: 6, name: 'Verified Photography Credits', description: 'Upgrade your property\'s visual appeal with our premium professional photoshoot service.', price: 3600, icon: 'fas fa-camera text-blue-500', recommended: true },
    { id: 7, name: 'Verified Videography Credits', description: 'Bring your property to life with our captivating videography service.', price: 12000, icon: 'fas fa-video text-orange-500', recommended: true }
];

const ProductPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    // Retrieve cart data from localStorage on page load
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    // Save cart data to localStorage when cart changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    const updateQuantity = (product, quantity) => {
        if (quantity <= 0) {
            setCart(cart.filter(item => item.id !== product.id));
        } else {
            setCart(cart.map(item => item.id === product.id ? { ...item, quantity } : item));
        }
    };

    const removeFromCart = (product) => {
        setCart(cart.filter(item => item.id !== product.id));
    };

    // Calculate total amount
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const proceedToPayment = () => {
        if (total === 0) {
            notify("warning", "Please select a product to proceed to payment."); // Display error message
        } else if (cart.length === 0) {
            notify("warning", "Your cart is empty. Add items before proceeding.");
        } else {
            // Navigate to the payment page if total is greater than 0
            navigate('/portfolio/payment-checkout', { state: { cart, total } });
        }
    };

    return (
        <div className="product-page">
            <div className="product-grid">
                <div className="listings">
                    <div className="card">
                        <h2>Listings</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.slice(0, 3).map(product => (
                                    <tr key={product.id}>
                                        <td className="product-info">
                                            <i className={product.icon}></i>
                                            <div>
                                                <div className="product-name">{product.name}</div>
                                                <div className="product-description">{product.description}</div>
                                            </div>
                                        </td>
                                        <td>Rs.{product.price}</td>
                                        <td>
                                            <button onClick={() => addToCart(product)} className="add-button">Add To Cart</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="card">
                        <h2>Credits <span className="note">(Only applicable on already posted listings)</span></h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.slice(3).map(product => (
                                    <tr key={product.id}>
                                        <td className="product-info">
                                            <i className={product.icon}></i>
                                            <div>
                                                <div className="product-name">
                                                    {product.name} {product.recommended && <span className="recommended">Recommended</span>}
                                                </div>
                                                <div className="product-description">{product.description}</div>
                                            </div>
                                        </td>
                                        <td>Rs.{product.price}</td>
                                        <td>
                                            <button onClick={() => addToCart(product)} className="add-button">Add To Cart</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="order-summary">
                    <h2>Order Summary</h2>
                    <ul className='cart-list'>
                        {cart.map(item => (
                            <li key={item.id} className="cart-item">
                                <span>{item.name} ({item.quantity}x)</span>
                                <span>Rs {item.price * item.quantity}</span>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item, item.quantity - 1)}>-</button>
                                    <input type="text" value={item.quantity} onChange={(e) => updateQuantity(item, parseInt(e.target.value) || 0)} />
                                    <button onClick={() => updateQuantity(item, item.quantity + 1)}>+</button>
                                    <button onClick={() => removeFromCart(item)} className="remove-button">🗑️</button> 
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="total">
                        <span>Total:</span>
                        <span>Rs {total}</span>
                    </div>
                    
                    <button onClick={proceedToPayment} className="proceed-button">Proceed To Payment</button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;