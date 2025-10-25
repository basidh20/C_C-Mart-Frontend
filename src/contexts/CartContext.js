import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

const CartContext = createContext();

const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
};

// Load cart from localStorage for specific user
const loadCartFromStorage = (userId) => {
  try {
    if (!userId) return initialState;
    
    const cartKey = `cart_user_${userId}`;
    const cartData = localStorage.getItem(cartKey);
    if (!cartData) return initialState;
    
    const parsed = JSON.parse(cartData);
    
    // Validate cart structure
    if (!parsed.items || !Array.isArray(parsed.items)) {
      console.warn('Invalid cart data in localStorage, resetting cart');
      localStorage.removeItem(cartKey);
      return initialState;
    }
    
    // Recalculate totals to ensure accuracy
    const validItems = parsed.items.filter(item => item && item.id && item.price);
    const recalculated = {
      items: validItems,
      total: validItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      itemCount: validItems.reduce((sum, item) => sum + item.quantity, 0),
    };
    
    return recalculated;
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    if (userId) {
      localStorage.removeItem(`cart_user_${userId}`);
    }
    return initialState;
  }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD_CART':
      return action.payload;
    
    case 'ADD_TO_CART': {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.items, { ...product, quantity }];
      }
      
      const newState = {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
      
      return newState;
    }
    
    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const newState = {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
      
      return newState;
    }
    
    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: id });
      }
      
      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      const newState = {
        items: newItems,
        total: newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      };
      
      return newState;
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load user's cart when user changes or logs in
  useEffect(() => {
    if (user && user.id) {
      const userCart = loadCartFromStorage(user.id);
      dispatch({ type: 'LOAD_CART', payload: userCart });
    } else {
      // Clear cart when user logs out
      dispatch({ type: 'LOAD_CART', payload: initialState });
    }
  }, [user?.id]);

  // Save cart to localStorage whenever it changes (user-specific)
  useEffect(() => {
    if (user && user.id) {
      const cartKey = `cart_user_${user.id}`;
      localStorage.setItem(cartKey, JSON.stringify(state));
    }
  }, [state, user?.id]);

  const addToCart = (product, quantity = 1) => {
    // Check if user is logged in
    if (!isAuthenticated || !user) {
      toast.warning('Please log in to add items to your cart');
      return false;
    }
    
    // Check if product has stock
    if (!product.stockQuantity || product.stockQuantity <= 0) {
      toast.error(`${product.name} is out of stock`);
      return false;
    }
    
    // Check if requested quantity exceeds available stock
    const existingItem = state.items.find(item => item.id === product.id);
    const currentCartQuantity = existingItem ? existingItem.quantity : 0;
    const newTotalQuantity = currentCartQuantity + quantity;
    
    if (newTotalQuantity > product.stockQuantity) {
      toast.error(`Only ${product.stockQuantity} ${product.unit || 'units'} available for ${product.name}`);
      return;
    }
    
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    toast.success(`${product.name} added to cart!`);
    return true;
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    toast.success('Item removed from cart');
  };

  const updateQuantity = (id, quantity) => {
    // Find the item to check stock
    const item = state.items.find(i => i.id === id);
    if (item && quantity > item.stockQuantity) {
      toast.error(`Only ${item.stockQuantity} ${item.unit || 'units'} available`);
      return;
    }
    
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = (options = {}) => {
    dispatch({ type: 'CLEAR_CART' });
    if (options.showToast !== false) {
      toast.success('Cart cleared');
    }
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const value = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
  clearCart,
    getItemQuantity,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};










