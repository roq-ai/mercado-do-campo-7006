import { ReviewInterface } from 'interfaces/review';
import { ProducerInterface } from 'interfaces/producer';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  producer_id?: string;
  created_at?: any;
  updated_at?: any;
  review?: ReviewInterface[];
  producer?: ProducerInterface;
  _count?: {
    review?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  category?: string;
  producer_id?: string;
}
