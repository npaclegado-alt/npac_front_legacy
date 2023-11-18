import {
    ReactNode,
    createContext,
    useCallback,
    useState,
    useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/requests/auth";
import { toast } from "react-toastify";
import { getProductById, getProducts } from "../services/requests/products";
import api from "../services/api";
import {
    adressByPostalCode, citiesByState, states
} from '../services/requests/postalService';
import { profileAgent } from '../services/requests/profileAgent'
import { User } from "../types/user";



interface IContextApi {
    isAuthenticated: boolean
    loginRequest: (email: string, password: string) => void;
    logoutRequest: () => void;
    user?: User;
    drawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    getAllProducts: () => void,
    getAdressByPostalCode: (postalCode: string) => void,
    getAllStates: (idUf?: string) => void,
    getCitiesByUf: (ufId: string) => void,
    profileEditAgent: (id: string, data: User) => void,
    editAgentProfile: boolean,
    setEditAgentProfile: (action: boolean | ((action: boolean) => boolean)) => void;
    ufs: [
        {
            id: number,
            sigla: string,
            nome: string,
            regiao: {
                id: number,
                sigla: string,
                nome: string
            }
        },
    ],
    products: [
        {
            _id: string,
            name: string,
            price: number,
            auffs: number,
            imageUrls: string[]
        }
    ],
    productsById: (id: string) => void,
    productFiltered: {
        _id: string,
        name: string,
        description: string,
        price: number,
        auffs: number,
        imageUrls: string[]
    },
    adress: {
        cep: string,
        logradouro: string,
        complemento: string,
        bairro: string,
        localidade: string,
        uf: string,
        ibge: string,
        gia: string,
        ddd: string,
        siafi: string
    },
    cities: [
        {
            id: number,
            nome: string,
            microrregiao: {
                id: number,
                nome: string,
                mesorregiao: {
                    id: number,
                    nome: string,
                    UF: {
                        id: number,
                        sigla: string,
                        nome: string,
                        regiao: {
                            id: number,
                            sigla: string,
                            nome: string
                        }
                    }
                }
            }
        }
    ]
}

export const ContextApi = createContext<IContextApi>({
    isAuthenticated: false,
    loginRequest: (email: string, password: string) => { },
    logoutRequest: () => { },
    user: undefined,
    getAllProducts: () => { },
    drawerOpen: false,
    setDrawerOpen: () => { },
    getAdressByPostalCode: (postalCode: string) => { },
    getAllStates: (idUf?: string) => { },
    getCitiesByUf: (ufId: string) => { },
    profileEditAgent: (id: string, data: User) => { },
    editAgentProfile: false,
    setEditAgentProfile: (action: boolean | ((action: boolean) => boolean)) => { },
    ufs: [
        {
            id: 0,
            sigla: '',
            nome: '',
            regiao: {
                id: 0,
                sigla: '',
                nome: ''
            }
        },
    ],
    products: [
        {
            _id: '',
            name: '',
            price: 0,
            auffs: 0,
            imageUrls: ['']
        }
    ],
    productsById: () => { },
    productFiltered: {
        _id: '',
        name: '',
        description: '',
        price: 0,
        auffs: 0,
        imageUrls: ['']
    },
    adress: {
        cep: '',
        logradouro: '',
        complemento: '',
        bairro: '',
        localidade: '',
        uf: '',
        ibge: '',
        gia: '',
        ddd: '',
        siafi: ''
    },
    cities: [
        {
            id: 0,
            nome: '',
            microrregiao: {
                id: 0,
                nome: '',
                mesorregiao: {
                    id: 0,
                    nome: '',
                    UF: {
                        id: 0,
                        sigla: '',
                        nome: '',
                        regiao: {
                            id: 0,
                            sigla: '',
                            nome: ''
                        }
                    }
                }
            }
        }
    ]
})

interface Props {
    children: ReactNode;
}

const ContextProvider: React.FC<Props> = ({ children }) => {
    const storedUser = localStorage.getItem("user");
    const navigate = useNavigate();
    const [user, setUser] = useState<User | undefined>(
        storedUser ? JSON.parse(storedUser) : undefined
    );
    const [products, setProducts] = useState<any>([]);
    const [productFiltered, setProductFiltered] = useState<any>([]);
    const [adress, setAdress] = useState<any>();
    const [ufs, setUfs] = useState<any>([]);
    const [cities, setCities] = useState<any>([]);
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [editAgentProfile, setEditAgentProfile] = useState(false)



    const isAuthenticated = useMemo(() => {
        return !!user;
    }, [user]);

    const logoutRequest = useCallback(() => {
        setUser(undefined);
        localStorage.setItem("user", "");
        api.defaults.headers.Authorization = "";
    }, []);

    const loginRequest = useCallback(
        (email: string, password: string) => {
            const request = login(email, password);
            toast.promise(request, {
                pending: {
                    render() {
                        return "Carregando...";
                    },
                },
                success: {
                    render({ data }: any) {
                        const token = data.data.token;
                        api.defaults.headers.Authorization = `Bearer ${token}`;
                        const user = { ...data.data.user, token };
                        setUser(user);
                        navigate("/");
                        localStorage.setItem("user", JSON.stringify(user));
                        return "Logado com sucesso!";
                    },
                },
                error: {
                    render({ data }: any) {
                        const message = data.response.data.message;
                        return message;
                    },
                },
            });
        },
        [navigate]
    );

    const getAllProducts = useCallback(() => {
        const request = getProducts()
        toast.promise(request, {
            pending: {
                render() {
                    return 'Carregando...'
                }
            },
            success: {
                render({ data }: any) {
                    //TODO
                    setProducts(data?.data)
                    return 'Produtos carregados com sucesso!'
                }
            },
            error: {
                render({ data }: any) {
                    //TODO
                    return 'Falha ao carregar produtos!'
                }
            }
        })
    }, [])

    const productsById = useCallback((id: string) => {
        const request = getProductById(id)
        toast.promise(request, {
            pending: {
                render() {
                    return 'Carregando...'
                }
            },
            success: {
                render({ data }: any) {
                    //TODO
                    setProductFiltered(data?.data)
                    return 'Produtos carregados com sucesso!'
                }
            },
            error: {
                render({ data }: any) {
                    //TODO
                    return 'Falha ao carregar produtos!'
                }
            }
        })
    }, [])

    const getAdressByPostalCode = useCallback((postalCode: string) => {
        const request = adressByPostalCode(postalCode)
        toast.promise(request, {
            pending: {
                render() {
                    return 'Carregando...'
                }
            },
            success: {
                render({ data }: any) {
                    //TODO
                    setAdress(data?.data)
                    let idUf = data?.data?.ibge.slice(0, 2)
                    getAllStates(idUf)
                    return 'Endereço carregado com sucesso!'
                }
            },
            error: {
                render({ data }: any) {
                    //TODO
                    setAdress(null);
                    return 'Falha ao carregar endereço!'
                }
            }
        })
    }, [])

    const getAllStates = useCallback((idUf?: string) => {
        const request = states(idUf)
        toast.promise(request, {
            pending: {
                render() {
                    return 'Carregando...'
                }
            },
            success: {
                render({ data }: any) {
                    if (data?.data?.id) {
                        setUfs(new Array(data?.data));
                        getCitiesByUf(data?.data?.id.toString());
                    } else {
                        setUfs(data?.data);
                    }
                    return ''
                },
                style: {
                    display: 'none'
                }
            },
            error: {
                render({ data }: any) {
                    //TODO
                    return 'Falha ao carregar estados!'
                }
            }
        })
    }, [])

    const getCitiesByUf = useCallback((ufId: string) => {
        const request = citiesByState(ufId)
        toast.promise(request, {
            pending: {
                render() {
                    return 'Carregando...'
                }
            },
            success: {
                render({ data }: any) {
                    setCities(data?.data);
                    return ''
                },
                style: {
                    display: 'none'
                }
            },
            error: {
                render({ data }: any) {
                    //TODO
                    return 'Falha ao carregar cidades!'
                }
            }
        })
    }, [])


    const profileEditAgent = useCallback((id: string, data: User) => {
        console.log(data, '-----DATA')
        const request = profileAgent(id, data)
        toast.promise(request, {
            pending: {
                render() {
                    setEditAgentProfile(true)
                    return 'Carregando...'
                }
            },
            success: {
                render({ data }: any) { 
                      const token = user?.token
                      const dataUser = { ...data.data, token: token};  
                      setUser(dataUser)
                      localStorage.setItem("user", JSON.stringify(dataUser))  
                      setEditAgentProfile(false)
                      return 'Perfil atualizado com  com sucesso!'
                }
            },
            error: {
                render({ data }: any) {
                    setEditAgentProfile(true)
                    return 'Falha ao atualizar o perfil!'
                }
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <ContextApi.Provider
            value={{
                isAuthenticated,
                loginRequest,
                user,
                logoutRequest,
                getAllProducts,
                products,
                productFiltered,
                productsById,
                adress,
                getAdressByPostalCode,
                getAllStates,
                ufs,
                getCitiesByUf,
                cities,
                drawerOpen,
                setDrawerOpen,
                profileEditAgent,
                editAgentProfile,
                setEditAgentProfile,
            }}
        >
            {children}
        </ContextApi.Provider>
    )
}

export default ContextProvider;
