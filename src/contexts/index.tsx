import {
  ReactNode,
  createContext,
  useCallback,
  useState,
  useMemo,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/requests/auth";
import { toast } from "react-toastify";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
} from "../services/requests/products";
import api from "../services/api";
import {
  adressByPostalCode,
  citiesByState,
  states,
} from "../services/requests/postalService";

import { getSpheres } from "../services/requests/spheres";
import { uploadProductImage } from "../services/requests/files";
import { X } from "lucide-react";

import { getCareer } from "../services/requests/career";

interface Career {
  front1: {
    AG: number;
    AA: number;
  };
  front2: {
    AG: number;
    AA: number;
  };
  front3: {
    AG: number;
    AA: number;
  };
  front4: {
    AG: number;
    AA: number;
  };

  otherFronts: {
    AG: number;
    AA: number;
  };

  _id: string;
  generatedAuffs: number;
  utilizedAuffs: number;
  careerLevel: string;
  careerPoints: string;
  user: string;
}

interface User {
  expiresIn: string;
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
  user?: User | null;
  dimensions: {
    width: number;
    height: number;
  };
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getAllProducts: () => void;
  clearProductFiltered: () => void;
  addProductRequest: (
    name: string,
    description: string,
    price: number,
    auff: number,
    files: File[],
    isCommissionable: boolean,
    commissionType?: string
  ) => void;
  deleteProductRequest: (id: string) => void;
  getAdressByPostalCode: (postalCode: string) => void;
  getAllStates: (idUf?: string) => void;
  getCitiesByUf: (ufId: string) => void;
  getAllCareer: () => void;
  career?: Career;
  ufs: [
    {
      id: number;
      sigla: string;
      nome: string;
      regiao: {
        id: number;
        sigla: string;
        nome: string;
      };
    }
  ];
  products: [
    {
      _id: string;
      name: string;
      description: string;
      price: number;
      auff: number;
      imageUrls: string[];
      isCommissionable: boolean;
      commissionType?: string;
    }
  ];
  productsById: (id: string) => void;
  productFiltered: {
    _id: string;
    name: string;
    description: string;
    price: number;
    auff: number;
    imageUrls: string[];
    isCommissionable: boolean;
    commissionType?: string;
  };
  adress: {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
  };
  cities: [
    {
      id: number;
      nome: string;
      microrregiao: {
        id: number;
        nome: string;
        mesorregiao: {
          id: number;
          nome: string;
          UF: {
            id: number;
            sigla: string;
            nome: string;
            regiao: {
              id: number;
              sigla: string;
              nome: string;
            };
          };
        };
      };
    }
  ];
  spheresResp:{
        userId: string,
        role: string,
        name: string,
        email: string,
        children: any[],
        avatar: string
   }
}
          
export const ContextApi = createContext<IContextApi>({
  isAuthenticated: false,
  loginRequest: (email: string, password: string) => {},
  logoutRequest: () => {},
  dimensions: {
    width: 0,
    height: 0,
  },
  user: undefined,
  getAllProducts: () => {},
  addProductRequest: () => {},
  clearProductFiltered: () => {},
  deleteProductRequest: () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
  getAdressByPostalCode: (postalCode: string) => {},
  getAllStates: (idUf?: string) => {},
  getCitiesByUf: (ufId: string) => {},
  getSpheresByUser: (userId: string) => {},
  getAllCareer: () => {},
  career: undefined,
  ufs: [
    {
      id: 0,
      sigla: "",
      nome: "",
      regiao: {
        id: 0,
        sigla: "",
        nome: "",
      },
    },
  ],
  products: [
    {
      _id: "",
      name: "",
      description: "",
      price: 0,
      auff: 0,
      imageUrls: [""],
      isCommissionable: false,
      commissionType: "",
    },
  ],
  productsById: () => {},
  productFiltered: {
    _id: "",
    name: "",
    description: "",
    price: 0,
    auff: 0,
    imageUrls: [""],
    isCommissionable: false,
    commissionType: "",
  },
  adress: {
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    ibge: "",
    gia: "",
    ddd: "",
    siafi: "",
  },
  cities: [
    {
      id: 0,
      nome: "",
      microrregiao: {
        id: 0,
        nome: "",
        mesorregiao: {
          id: 0,
          nome: "",
          UF: {
            id: 0,
            sigla: "",
            nome: "",
            regiao: {
              id: 0,
              sigla: "",
              nome: "",
            },
          },
        },
      },
    },
  ],
  spheresResp: {
     userId: '',
     role: '',
     name: '',
     email: '',
     children: [],
     avatar: ''
 }
});

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
  const [productFiltered, setProductFiltered] = useState<any>();
  const [adress, setAdress] = useState<any>();
  const [ufs, setUfs] = useState<any>([]);
  const [cities, setCities] = useState<any>([]);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [spheresResp, setSpheresResp] = useState<any>([]);
  const [career, setCareer] = useState<Career>();
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const isAuthenticated = useMemo(() => {
    return !!user;
  }, [user]);

  const handleResize = () => {
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);

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
            const expiresIn = data.data.expiresIn;
            const user = { ...data.data.user, token, expiresIn };
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
          return "Falha ao carregar produtos!";
        },
      },
    });
  }, []);

  const clearProductFiltered = useCallback(() => {
    setProductFiltered(null);
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
          return "Falha ao carregar produtos!";
        },
      },
    });
  }, []);

  const addProductRequest = useCallback(
    async (
      name: string,
      description: string,
      price: number,
      auff: number,
      files: File[],
      isCommissionable: boolean,
      commissionType?: string
    ) => {
      const toastId = toast.loading("Carregando...");
      addProduct(
        name,
        description,
        price,
        auff,
        isCommissionable,
        commissionType
      )
        .then((data: any) => {
          const id = data.data._id;

          uploadProductImage(id, files)
            .then(() => {
              toast.update(toastId, {
                render: "Produto cadastrado com sucesso!",
                type: "success",
                isLoading: false,
                autoClose: 5000,
                closeButton: <X size={16} color="#8B8B8B" />,
                closeOnClick: true,
              });
              navigate("/admin/products");
            })
            .catch(() => {
              deleteProduct(id).finally(() => {
                toast.update(toastId, {
                  render: "Falha ao cadastrar o produto!",
                  type: "error",
                  isLoading: false,
                  autoClose: 5000,
                  closeButton: <X size={16} color="#8B8B8B" />,
                  closeOnClick: true,
                });
              });
            });
        }).catch(() => {
          toast.update(toastId, {
            render: "Falha ao cadastrar produto!",
            type: "error",
            isLoading: false,
            autoClose: 5000,
            closeButton: <X size={16} color="#8B8B8B" />,
            closeOnClick: true,
          });
        });
    },
    [navigate]
  );
    
  const deleteProductRequest = useCallback(
    (id: string) => {
      const request = deleteProduct(id);
      toast.promise(request, {
        pending: {
          render() {
            return "Carregando...";
          },
        },
        success: {
          render({ data }: any) {
            setProducts(products.filter((product: any) => product._id !== id));
            return "Produto removido com sucesso!";
          },
        },
        error: {
          render({ data }: any) {
            return "Falha ao remover produto!";
          },
        },
      });
    },
    [products]
  );

  const getAdressByPostalCode = useCallback((postalCode: string) => {
    const request = adressByPostalCode(postalCode);
    toast.promise(request, {
      pending: {
        render() {
          return "Carregando...";
        },
      },
      success: {
        render({ data }: any) {
          //TODO
          setAdress(data?.data);
          let idUf = data?.data?.ibge.slice(0, 2);
          getAllStates(idUf);
          return "Endereço carregado com sucesso!";
        },
      },
      error: {
        render({ data }: any) {
          //TODO
          setAdress(null);
          return "Falha ao carregar endereço!";
        },
      },
    });
  }, []);

  const getAllStates = useCallback((idUf?: string) => {
    const request = states(idUf);
    toast.promise(request, {
      pending: {
        render() {
          return "Carregando...";
        },
      },
      success: {
        render({ data }: any) {
          if (data?.data?.id) {
            setUfs(new Array(data?.data));
            getCitiesByUf(data?.data?.id.toString());
          } else {
            setUfs(data?.data);
          }
          return "";
        },
        style: {
          display: "none",
        },
      },
      error: {
        render({ data }: any) {
          //TODO
          return "Falha ao carregar estados!";
        },
      },
    });
  }, []);

  const getCitiesByUf = useCallback((ufId: string) => {
    const request = citiesByState(ufId);
    toast.promise(request, {
      pending: {
        render() {
          return "Carregando...";
        },
      },
      success: {
        render({ data }: any) {
          setCities(data?.data);
          return "";
        },
        style: {
          display: "none",
        },
      },
      error: {
        render({ data }: any) {
          //TODO
          return "Falha ao carregar cidades!";
        },
      },
    });
  }, []);

  const getAllCareer = useCallback(() => {
    const request = getCareer();
    toast.promise(request, {
      pending: {
        render() {
          return "Carregando...";
        },
      },
      success: {
        render({ data }: any) {
          //TODO
          setCareer(data?.data);
          return "Carreira carregada com sucesso!";
        },
      },
      error: {
        render({ data }: any) {
          //TODO
          return "Falha ao carregar carreira!";
        },
      },
    });
  }, []);

const getSpheresByUser = useCallback((userId: string | undefined) => {
        const request = getSpheres(userId)
        toast.promise(request,{
            pending: {
                render() {  
                    return 'Carregando...'
                }
            },
            success: {
                render({ data }: any) {
                    setSpheresResp(data?.data);
                    return ''
                },
                style: {
                    display: 'none'
                }
            },
            error: {
                render({ data }: any) {
                    //TODO
                    return 'Falha ao carregar Esferas!'
                }
            }
        })
    },[])

  return (
    <ContextApi.Provider
      value={{
        isAuthenticated,
        loginRequest,
        user,
        logoutRequest,
        getAllProducts,
        addProductRequest,
        deleteProductRequest,
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
        spheresResp,
        getSpheresByUser
        getAllCareer,
        career,
        clearProductFiltered,
        dimensions,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;
