import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from "react";
import { login } from "../services/requests/auth";
import { toast } from "react-toastify";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  cpf: string;
  email: string;
  role: string;
  password: string;
  phone: string;
  createdAt: string;
  __v: number;
  avatar: string;
  token: string;
}

interface IContextApi {
  isAuthenticated: boolean;
  loginRequest: (email: string, password: string) => void;
  logoutRequest: () => void;
  user?: User;
}

export const ContextApi = createContext<IContextApi>({
  isAuthenticated: false,
  loginRequest: () => {},
  logoutRequest: () => {},
  user: undefined,
});

interface Props {
  children: ReactNode;
}

const ContextProvider: React.FC<Props> = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [user, setUser] = useState<User | undefined>(
    storedUser ? JSON.parse(storedUser) : undefined
  );
  const navigate = useNavigate();

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

  return (
    <ContextApi.Provider
      value={{ isAuthenticated, loginRequest, user, logoutRequest }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;
