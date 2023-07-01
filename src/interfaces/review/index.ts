import { CustomerInterface } from 'interfaces/customer';
import { ProductInterface } from 'interfaces/product';
import { GetQueryInterface } from 'interfaces';

export interface ReviewInterface {
  id?: string;
  comment: string;
  rating: number;
  customer_id?: string;
  product_id?: string;
  created_at?: any;
  updated_at?: any;

  customer?: CustomerInterface;
  product?: ProductInterface;
  _count?: {};
}

export interface ReviewGetQueryInterface extends GetQueryInterface {
  id?: string;
  comment?: string;
  customer_id?: string;
  product_id?: string;
}
