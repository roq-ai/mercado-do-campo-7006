import { GetQueryInterface } from 'interfaces';

export interface CategoryInterface {
  id?: string;
  name: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface CategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
}
