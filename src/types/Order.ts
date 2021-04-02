export interface Order {
    id: number;
    paymentStatus?: string;
    fulfillmentStatus?: string;
    total?: number;
    customerEmail: string;
    products: any;
}
