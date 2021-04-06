export interface Product {
  id: number;
  title?: string;
  sku?: string;
  price?: number;
  desc?: string;
  weight?: number;
  quantity?: number;
  enabled?: boolean;
  count?: number;
}
export interface NewProduct {
  title?: string;
  sku?: string;
  price?: number;
  desc?: string;
  weight?: number;
  quantity?: number;
  enabled?: boolean;
}
