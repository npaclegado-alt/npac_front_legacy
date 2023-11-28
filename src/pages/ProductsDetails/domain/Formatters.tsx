import { toast } from "react-toastify";
import Filters from "../../../libs/Filters";

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
  password?: string; 
  code?: string 
}
const formatDataForApi = (
  formData: FormDataTransaction,
  product: Product,
  adress: Adress
): FormattedData => {

  const mandatoryFields: (keyof FormDataTransaction)[] = ['name', 'cpf', 'email', 'phone', 'cep', 'logradouro', 'numero','password', 'code'];

  for (const field of mandatoryFields) {
    if (!formData[field]) {
      toast.error(`Campo(s) obrigatorio(s): ${field}`)

      throw new Error(`Missing mandatory field: ${field}`);
    }
  }

  const phoneNumberOnlyNumbers = Filters.clearStringOnlyNumbers(formData.phone);
  const formattedData = {
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
      code: formData.code || "",
      document: formData.cpf.replace(/\D/g, ""),
      document_type: "CPF", 
      password: formData.password || "",
    },
    shipping: {
      amount: 1,
      description: product.description.slice(0, 50),
      recipient_name: formData.name,
      recipient_phone: formData.phone,
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
        amount: product.price * 100,
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

  return formattedData;
};

export { formatDataForApi }


