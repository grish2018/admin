import { Product } from "@/types/Product";

export interface Order {
    id: number;
    paymentStatus?: string;
    fulfillmentStatus?: string;
    total?: number;
    customerEmail?: string;
    products: Product[];
}
