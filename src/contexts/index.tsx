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
  getAllProducts: () => void;
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  products: [
    {
      _id: string;
      name: string;
      price: number;
      auffs: number;
      imageUrls: string[];
    }
  ];
  productsById: (id: string) => void;
  productFiltered: {
    _id: string;
    name: string;
    description: string;
    price: number;
    auffs: number;
    imageUrls: string[];
  };
}

export const ContextApi = createContext<IContextApi>({
  isAuthenticated: false,
  loginRequest: () => {},
  logoutRequest: () => {},
  user: undefined,
  getAllProducts: () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
  products: [
    {
      _id: "",
      name: "",
      price: 0,
      auffs: 0,
      imageUrls: [""],
    },
  ],
  productsById: () => {},
  productFiltered: {
    _id: "",
    name: "",
    description: "",
    price: 0,
    auffs: 0,
    imageUrls: [""],
  },
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
  const [products, setProducts] = useState<any>([]);
  const [productFiltered, setProductFiltered] = useState<any>([]);
  const isAuthenticated = useMemo(() => {
    return !!user;
  }, [user]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

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
    const request = getProducts();
    toast.promise(request, {
      pending: {
        render() {
          return "Carregando...";
        },
      },
      success: {
        render({ data }: any) {
          //TODO
          setProducts(data?.data);
          return "Produtos carregados com sucesso!";
        },
      },
      error: {
        render({ data }: any) {
          //TODO
          console.log("ErrorProducts", data);
          return "Falha ao carregar produtos!";
        },
      },
    });
  }, []);

  const productsById = useCallback((id: string) => {
    const request = getProductById(id);
    toast.promise(request, {
      pending: {
        render() {
          return "Carregando...";
        },
      },
      success: {
        render({ data }: any) {
          //TODO
          setProductFiltered(data?.data);
          return "Produtos carregados com sucesso!";
        },
      },
      error: {
        render({ data }: any) {
          //TODO
          console.log("ErrorProducts", data);
          return "Falha ao carregar produtos!";
        },
      },
    });
  }, []);

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
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;
