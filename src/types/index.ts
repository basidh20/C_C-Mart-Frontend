export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}



export interface CartState {
  items: CartItem[];
  total: number;
}
