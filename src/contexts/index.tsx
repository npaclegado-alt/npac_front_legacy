import {
    ReactNode,
    createContext,
    useCallback,
} from 'react';
import { login } from '../services/requests/auth';
import { toast } from 'react-toastify';

interface IContextApi {
    isAuthenticated: boolean
    loginRequest: (email:string, password:string) => void
}

export const ContextApi = createContext<IContextApi>({
    isAuthenticated: false,
    loginRequest: () => {}
})

interface Props {
    children:ReactNode
}

const ContextProvider: React.FC<Props> = ({ children }) => {
    const isAuthenticated = true

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

    return (
        <ContextApi.Provider value={{isAuthenticated, loginRequest}}>
            {children}
        </ContextApi.Provider>
    )
}

export default ContextProvider