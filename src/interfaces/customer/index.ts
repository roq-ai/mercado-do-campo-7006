import { CartInterface } from 'interfaces/cart';
import { OrderInterface } from 'interfaces/order';
import { ReviewInterface } from 'interfaces/review';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerInterface {
  id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  cart?: CartInterface[];
  order?: OrderInterface[];
  review?: ReviewInterface[];
  user?: UserInterface;
  _count?: {
    cart?: number;
    order?: number;
    review?: number;
  };
}

export interface CustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
