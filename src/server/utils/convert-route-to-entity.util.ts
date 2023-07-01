const mapping: Record<string, string> = {
  carts: 'cart',
  categories: 'category',
  customers: 'customer',
  orders: 'order',
  producers: 'producer',
  products: 'product',
  reviews: 'review',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
