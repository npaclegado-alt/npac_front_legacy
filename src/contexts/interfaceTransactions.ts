interface Item {
    id: string;
    type: string;
    code: string;
    amount: number;
    description: string;
    quantity: number;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Address {
    id: string;
    line_1: string;
    line_2: string;
    zip_code: string;
    city: string;
    state: string;
    country: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Phone {
    country_code: string;
    number: string;
    area_code: string;
}

interface Customer {
    id: string;
    name: string;
    email: string;
    code: string;
    document: string;
    document_type: string;
    type: string;
    delinquent: boolean;
    address: Address;
    created_at: string;
    updated_at: string;
    phones: {
        mobile_phone: Phone;
    };
}

interface ShippingInfo {
    amount: number;
    description: string;
    recipient_name: string;
    recipient_phone: string;
    address: Address;
}

interface CreditCardInstallment {
    number: number;
    total: number;
}

interface CreditCard {
    capture: boolean;
    authentication: {
        type: string;
    };
    installments: CreditCardInstallment[];
}

interface Checkout {
    id: string;
    currency: string;
    amount: number;
    status: string;
    success_url: string;
    payment_url: string;
    customer_editable: boolean;
    required_fields: string[];
    billing_address_editable: boolean;
    skip_checkout_success_page: boolean;
    shippable: boolean;
    created_at: string;
    updated_at: string;
    expires_at: string;
    accepted_payment_methods: string[];
    accepted_brands: string[];
    accepted_multi_payment_methods: string[];
    customer: Customer;
    credit_card: CreditCard[];
    debit_card: {
        authentication: {
            type: string;
        };
    }[];
    pix: {
        expires_at: string;
        additional_information: any[];
    };
    bank_transfer: {
        bank: string[];
    };
    shipping: ShippingInfo[];
}

interface ShippingCompany {
    id: number;
    name: string;
    picture: string;
}

interface ShippingSelected {
    id: number;
    name: string;
    price: string;
    company: ShippingCompany;
    shippingValues: {
        width: number;
        height: number;
        length: number;
        weight: number;
    };
}

interface Product {
    name: string;
    quantity: number;
    unitary_value: number;
    weight: any;
}

interface Volume {
    id: number;
    height: string;
    width: string;
    length: string;
    diameter: string;
    weight: string;
    format: string;
    created_at: string;
    updated_at: string;
}

interface ShippingOrder {
    id: string;
    protocol: string;
    service_id: number;
    agency_id: any;
    contract: any;
    service_code: any;
    quote: number;
    price: number;
    coupon: any;
    discount: number;
    delivery_min: number;
    delivery_max: number;
    status: string;
    reminder: any;
    insurance_value: number;
    weight: any;
    width: any;
    height: any;
    length: any;
    diameter: any;
    format: string;
    billed_weight: number;
    receipt: boolean;
    own_hand: boolean;
    collect: boolean;
    collect_scheduled_at: any;
    reverse: number;
    non_commercial: boolean;
    authorization_code: any;
    tracking: any;
    self_tracking: any;
    delivery_receipt: any;
    additional_info: any;
    cte_key: any;
    paid_at: any;
    generated_at: any;
    posted_at: any;
    delivered_at: any;
    canceled_at: any;
    suspended_at: any;
    expired_at: any;
    created_at: string;
    updated_at: string;
    parse_pi_at: any;
    products: Product[];
    volumes: Volume[];
}

export interface IApiResponseTransactions {
    _id: string;
    id: string;
    code: string;
    amount: number;
    currency: string;
    closed: boolean;
    status: string;
    created_at: string;
    updated_at: string;
    items: Item[];
    customer: Customer;
    shipping: ShippingInfo;
    checkouts: Checkout[];
    sellerId: string;
    shippingSelected: ShippingSelected;
    pix_withdrawals: any[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    shippingOrder: ShippingOrder;
}
