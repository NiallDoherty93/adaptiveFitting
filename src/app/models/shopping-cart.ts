import { ShoppingCartItem } from './ShoppingCartItem';

export interface ShoppingCart {

  items: ShoppingCartItem[];
  dateCreated?: number;
  accessoryUpper?: string;
  accessoryLower?:  string;
  accessoryUpperItem?: string;
  accessoryLowerItem?: string;
}