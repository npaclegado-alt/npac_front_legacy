import {
    ReactNode,
    createContext,
    useCallback,
    useState
} from 'react';
import { login } from '../services/requests/auth';
import { toast } from 'react-toastify';
import { getProducts } from '../services/requests/npacApi';

interface IContextApi {
    isAuthenticated: boolean
    loginRequest: (email:string, password:string) => void,
    getAllProducts: () => void,
    products: [
        {
            _id: string,
            name: string,
            price: number,
            auffs: number,
            imageUrls: string[]
        }
    ]
}

export const ContextApi = createContext<IContextApi>({
    isAuthenticated: false,
    loginRequest: () => {},
    getAllProducts: () => {},
    products: [
        {
            _id: '',
            name: '',
            price: 0,
            auffs: 0,
            imageUrls: ['']
        }
    ]
})

interface Props {
    children:ReactNode
}

const ContextProvider: React.FC<Props> = ({ children }) => {
    const isAuthenticated = true
    const [products, setProducts] = useState<any>([]);

    const config = {
        headers: { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTM5ODI5ODY4ZGYyNTM2NzJiZWJlMzEiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTg1MTE0MjcsImV4cCI6MTY5ODg2NzgyN30.7Xs2tk1mflEb_a2UhC4Xy50NuzJT0355idION9fbT_4` }
    } 

    const loginRequest = useCallback((email:string, password:string) => {
        const request = login(email, password)
        toast.promise(request,{
            pending: {
                render() {
                    return 'Carregando...'
                },
            },
            success: {
                render({ data }: any) {
                    //TODO
                    console.log(data)
                    return 'Logado com sucesso!'
                },
            },
            error: {
                render({ data }: any) {
                    //TODO
                    console.log(data)
                    return 'Falha ao realizar login!'
                },
            },
        })
    },[])

   const getAllProducts = useCallback(() => {
        const request = getProducts(config)
        toast.promise(request,{
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
                    console.log('ErrorProducts', data)
                    return 'Falha ao carregar produtos!'
                }
            }
        })
    },[])
            

    return (
        <ContextApi.Provider 
            value={{
                isAuthenticated, 
                loginRequest,
                getAllProducts,
                products
            }}
        >
            {children}
        </ContextApi.Provider>
    )
}

export default ContextProvider