import {
    ReactNode,
    createContext,
} from 'react';

export const ContextApi = createContext<any>({})

interface Props {
    children:ReactNode
}

const ContextProvider: React.FC<Props> = ({ children }) => {
    const isAuthenticated = false
    return (
        <ContextApi.Provider value={{isAuthenticated}}>
            {children}
        </ContextApi.Provider>
    )
}

export default ContextProvider