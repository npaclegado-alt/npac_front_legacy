import {
    ReactNode,
    createContext,
} from 'react';

interface IContextApi {
    isAuthenticated: boolean
}

export const ContextApi = createContext<IContextApi>({
    isAuthenticated: false
})

interface Props {
    children:ReactNode
}

const ContextProvider: React.FC<Props> = ({ children }) => {
    const isAuthenticated = true
    return (
        <ContextApi.Provider value={{isAuthenticated}}>
            {children}
        </ContextApi.Provider>
    )
}

export default ContextProvider