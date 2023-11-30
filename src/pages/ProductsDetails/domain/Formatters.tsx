import { toast } from "react-toastify";
import Filters from "../../../libs/Filters";
import Decimal from "decimal.js";

interface Address {
  country: string;
  state: string;
  city: string;
  zip_code: string;
  line_1: string;
  line_2?: string;
}

interface MobilePhone {
  country_code: string;
  area_code: string;
  number: string;
}

interface Customer {
  address: Address;
  phones: {
    mobile_phone: MobilePhone;
  };
  name: string;
  type: string;
  email: string;
  code: string;
  document: string;
  document_type: string;
}

interface Shipping {
  amount: number;
  description: string;
  recipient_name: string;
  recipient_phone: string;
  address: Address;
}

interface metadataShipping {
  id: number;
  name: string;
  price: number;
  company: {
    id: number;
    name: string;
    picture: string;
  };
  shippingValues: {
    width: number;
    height: number;
    length: number;
    weight: number;
  }
}

interface Checkout {
  expires_in: number;
  billing_address_editable: boolean;
  customer_editable: boolean;
  accepted_payment_methods: string[];
  success_url: string;
}

interface Payment {
  amount: number;
  payment_method: string;
  checkout: Checkout;
}

interface Item {
  amount: number;
  description: string;
  quantity: number;
  code: string;
}

export interface FormattedData {
  customer: Customer;
  shipping: Shipping;
  payments: Payment[];
  items: Item[];
}

interface Product {
  price: number;
  description: string;
  _id: string;
  freeShipping?: boolean;
}

interface Adress {
  uf: string;
  localidade: string;
}
export interface FormDataTransaction {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  cep: string;
  logradouro: string;
  numero: string;
  metadataShipping?: metadataShipping | undefined | null;
  password?: string;
}
const formatDataForApi = (
  formData: FormDataTransaction,
  product: Product,
  adress: Adress
): FormattedData => {
  const mandatoryFields: (keyof FormDataTransaction)[] = [
    "name",
    "cpf",
    "email",
    "phone",
    "cep",
    "logradouro",
    "numero",
  ];

  for (const field of mandatoryFields) {
    if (!formData[field]) {
      toast.error(`Campo(s) obrigatorio(s): ${field}`);

      throw new Error(`Missing mandatory field: ${field}`);
    }
  }

  const phoneNumberOnlyNumbers = Filters.clearStringOnlyNumbers(formData.phone);
  const amountShipping = !product?.freeShipping ? new Decimal(Number(formData?.metadataShipping?.price) * 100) : 0;
  let formattedData = {
    customer: {
      address: {
        country: "BR",
        state: adress.uf.toString(),
        city: adress.localidade.toString(),
        zip_code: formData.cep,
        line_1: formData.logradouro,
        line_2: formData.numero,
      },
      phones: {
        mobile_phone: {
          country_code: "55",
          area_code: phoneNumberOnlyNumbers.substring(0, 2),
          number: phoneNumberOnlyNumbers.substring(2),
        },
      },
      name: formData.name,
      type: "individual",
      email: formData.email,
      code: "0",
      document: formData.cpf.replace(/\D/g, ""),
      document_type: "CPF",
      password: formData.password || "",
    },
    shipping: {
      amount: amountShipping ? amountShipping?.d[0] : 1,
      description: formData?.metadataShipping?.id?.toString() + ' - ' + formData?.metadataShipping?.name ?? null,
      recipient_name: formData.name,
      recipient_phone: phoneNumberOnlyNumbers,
      address: {
        country: "BR",
        state: adress.uf.toString(),
        city: adress.localidade.toString(),
        zip_code: formData.cep.replace("-", ""),
        line_1: formData.logradouro,
        line_2: formData.numero,
      },
    },
    payments: [
      {
        amount: amountShipping ? (product.price * 100) + amountShipping?.d[0] : product.price * 100,
        payment_method: "checkout",
        checkout: {
          expires_in: 120,
          billing_address_editable: false,
          customer_editable: true,
          accepted_payment_methods: ["credit_card", "debit_card"],
          success_url: "https://npac-dev-mykmm.ondigitalocean.app/",
        },
      },
    ],
    items: [
      {
        amount: product.price * 100,
        description: product.description.slice(0, 50),
        quantity: 1,
        code: product._id,
      },
    ],
  };

  if (!product?.freeShipping) {
    formattedData = {
      ...formattedData,
      // @ts-ignore
      shippingSelected: formData?.metadataShipping,
    };
  }

  // @ts-ignore
  return formattedData;
};

export { formatDataForApi };
