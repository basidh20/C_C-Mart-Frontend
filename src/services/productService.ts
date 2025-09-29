import apiClient from './apiClient';
import { Product } from '../types';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    return await apiClient.get('/products');
  },

  async getProductById(id: number): Promise<Product> {
    return await apiClient.get(`/products/${id}`);
  },
};