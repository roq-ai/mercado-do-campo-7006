import { CustomerInterface } from 'interfaces/customer';
import { GetQueryInterface } from 'interfaces';

export interface CartInterface {
  id?: string;
  customer_id?: string;
  created_at?: any;
  updated_at?: any;

  customer?: CustomerInterface;
  _count?: {};
}

export interface CartGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
}
