export interface Order {
    id: number;
    paymentStatus?: string;
    fulfillmentStatus?: string;
    total?: number;
    customerEmail?: string;
    products: ProductData[];
}

export interface ProductData {
    id: number;
    title: string;
    price: number;
    count: number;
}
