import { ProductItems } from "./product-items";
import { Accessories } from "./accessories";

export class ShoppingCartItem {
  constructor(public product: ProductItems, public quantity: number, public accessoriesLower: Accessories
    , public accessoriesUpper: Accessories, public accessoriesLowerItems: Accessories, 
    public accessoriesUpperItems: Accessories, public accessory: Accessories
   ) {}


}