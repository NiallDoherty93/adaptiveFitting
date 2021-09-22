import { Roles } from "./roles";

export interface UserDetails{
    address?: string,
    email?: string,
    uid?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    postcode?: string
    id?: string,
    roles?: Roles
  }
