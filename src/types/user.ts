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
    rua: string,
    complemento: string,
    numero: string,
    referencia: string,
    estado: string,
    cidade: string,
    bairro: string,
    dataNascimento: string,
    postalCode: string;
    token?: string;
}