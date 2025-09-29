import apiClient from './apiClient';
import { CartItem } from '../types';

export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

export interface UpdateCartItemRequest {
  quantity: number;
}

export const cartService = {
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return await apiClient.get(`/cart/${sessionId}`);
  },

  async addToCart(sessionId: string, request: AddToCartRequest): Promise<CartItem> {
    return await apiClient.post(`/cart/${sessionId}/add`, request);
  },

  async updateCartItem(itemId: number, request: UpdateCartItemRequest): Promise<CartItem> {
    return await apiClient.put(`/cart/item/${itemId}`, request);
  },

  async removeFromCart(itemId: number): Promise<void> {
    return await apiClient.delete(`/cart/item/${itemId}`);
  },

  async clearCart(sessionId: string): Promise<void> {
    return await apiClient.delete(`/cart/${sessionId}/clear`);
  },

  async getCartTotal(sessionId: string): Promise<{ total: number }> {
    return await apiClient.get(`/cart/${sessionId}/total`);
  },
};