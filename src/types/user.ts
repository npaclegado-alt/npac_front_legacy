export interface User {
    _id?: string;
    name: string;
    cpf: string;
    email: string;
    role: string;
    password: string;
    phone: string;
    createdAt?: string;
    __v?: number;
    avatar?: string;
    referencia?: string,
    bairro?: string,
    dataNascimento?: string,
    token?: string;  
    address: {
        street: string,
        number: string,
        complement: string,
        city: string,
        state: string,
        postalCode: string
    }
} 
