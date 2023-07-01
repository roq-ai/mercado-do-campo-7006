import { CustomerInterface } from 'interfaces/customer';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  total: number;
  delivery_address: string;
  order_status: string;
  customer_id?: string;
  created_at?: any;
  updated_at?: any;

  customer?: CustomerInterface;
  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  delivery_address?: string;
  order_status?: string;
  customer_id?: string;
}
