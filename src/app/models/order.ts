import { orderItem } from "./order-item";


export class Order {
    id!: string;
    datePlaced!: number;
    items!: orderItem[] ;
    uid!: string;
   
  }