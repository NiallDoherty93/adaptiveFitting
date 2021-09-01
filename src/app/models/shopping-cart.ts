import { ShoppingCartItem } from './ShoppingCartItem';




export interface ShoppingCart {

  items: ShoppingCartItem[];
  dateCreated?: number;
  accessoryUpper?: string;
  accessoryLower?:  string;
  accessoryUpperItem?: string;
  accessoryLowerItem?: string;
 
    /* Will create an an iterable for all of the products in the cart for the template */
  //   for (let productId in itemsMap) {
  //     let item = itemsMap[productId];
  //     this.items.push(new ShoppingCartItem(item.product, item.quantity));
  //   }
  // }

  // get productIds() {
  //   return Object.keys(this.items);
  // }

  // get totalItemsCount() {
  //   let count = 0;
  //   for (let productId in this.items) {
  //     count += this.items[productId].quantity;
  //   }
  //   return count;
  // }

  // get totalPrice() {
  //   let sum = 0;

  //   for (let productId in this.items) {
  //     sum += this.items[productId].totalPrice;
  //   }
  //   return sum;
  // }

  // getQuantity(product: ProductItems) {
  //   let item = this.itemsMap[product.id];
  //   return item ? item.quantity : 0;
  // }
}