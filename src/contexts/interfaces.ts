interface DeliveryRange {
    min: number;
    max: number;
}

interface Dimensions {
    height: number;
    width: number;
    length: number;
}

interface Product {
    id: string;
    quantity: number;
}

interface Package {
    price: string;
    discount: string;
    format: string;
    dimensions: Dimensions;
    weight: string;
    insurance_value: string;
    products: Product[];
}

interface AdditionalServices {
    receipt: boolean;
    own_hand: boolean;
    collect: boolean;
}

interface Company {
    id: number;
    name: string;
    picture: string;
}

export interface shippingCostResponseProps {
    id: number;
    name: string;
    price: string;
    custom_price: string;
    discount: string;
    currency: string;
    delivery_time: number;
    delivery_range: DeliveryRange;
    custom_delivery_time: number;
    custom_delivery_range: DeliveryRange;
    packages: Package[];
    additional_services: AdditionalServices;
    company: Company;
    error?: string;
}[];

export interface IFilesResponse {
    _id: string;
    name: string;
    originalName: string;
    fieldName: string;
    fieldId: string;
    path: string;
    key: string;
    size: number;
    type: string;
    createdAt: string;
    __v: number;
}