import { Accessories } from "./accessories";
import { ProductItems } from "./product-items";

export class orderItem {
  constructor(public product: ProductItems, public quantity: number, public accessoriesLower: Accessories
    , public accessoriesUpper: Accessories, public accessoriesLowerItems: Accessories, 
    public accessoriesUpperItems: Accessories, public accessory: Accessories
   ) {}

    
 
  }