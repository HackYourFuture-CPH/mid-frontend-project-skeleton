import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";
import PropTypes from 'prop-types';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] =  useLocalStorage("cartItems", []);

    const cartQuantity = cartItems.reduce(
        (accumulator, cartItem) => (accumulator + cartItem.quantity), 0);

    const addToCart = (id) => {
        setCartItems(
            (prevItems) => {
                if(prevItems.find(prevItem => prevItem.id === id) == null){
                    return [...prevItems, {id, quantity: 1}];
                }
                else{
                    return prevItems.map(prevItem => {
                        if(prevItem.id === id){
                            return {...prevItem, quantity: prevItem.quantity + 1}
                        }
                        else{
                            return prevItem;
                        }
                    })
                }
            }
        )

    }

    const removeFromCart = (id) => {
        setCartItems(
            (prevItems) => {
                if(prevItems.find(prevItem => prevItem.id === id)?.quantity === 1){
                    return prevItems.filter(prevItem => prevItem.id !== id);
                }
                else{
                    return prevItems.map(prevItem => {
                        if(prevItem.id === id){
                            return {...prevItem, quantity: prevItem.quantity - 1}
                        }
                        else{
                            return prevItem;
                        }
                    })
                }
            }
        )

    }

    const value = useMemo(() => ({
        cartItems,
        cartQuantity,
        addToCart,
        removeFromCart
    }), [cartItems, cartQuantity]);

    return(
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )



}

const useCartItems = () => {
    return useContext(CartContext);
}

export {
    useCartItems,
    CartProvider
}


