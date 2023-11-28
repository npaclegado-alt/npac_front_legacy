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
  editProduct,
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
import {
  deleteFile,
  getProductImages,
  uploadProductImage,
} from "../services/requests/files";
import { X } from "lucide-react";

import { getCareer } from "../services/requests/career";
import { getFaq } from "../services/requests/faq";

import {
  FormDataTransaction,
  formatDataForApi,
} from "../pages/ProductsDetails/domain/Formatters";
import {
  getTransactionsByUserId,
  submitTransaction,
} from "../services/requests/transactions";
import { ProductDetailsContentProps } from "../pages/ProductsDetails/domain/ProductDetailsContent";

import { profileAgent } from "../services/requests/profileAgent";
import { getCommissionsByUserId } from "../services/requests/commissions";

interface BaseCrudProduct {
  name: string;
  description: string;
  price: number;
  auff: number;
  createUser: boolean;
  commissionDistributionSpheres?: number[];
  commissionDistributionGroup?: number[];
  commissionDistributionCarrer: number[];
  commissionType: string;
  shippingValues?: {
    width: number;
    height: number;
    length: number;
    weight: number;
  };
  isCommissionable: boolean;
  directCommissionValue?: number;
  digitalProduct: boolean;
  freeShipping: boolean;
  recurrence: string;
}

export interface AddCrudProduct extends BaseCrudProduct {
  files: File[];
}

export interface EditCrudProduct extends BaseCrudProduct {
  id: string;
  newFiles: File[];
  removedFiles: IFile[];
}

interface IFile {
  _id: string;
  name: string;
  originalName: string;
  fieldName: string;
  fieldId: string;
  path: string;
  size: number;
  type: string;
  createdAt: string;
}

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

interface Faq {
  _id: string;
  question: string;
  answer: string;
  position: number;
}
export interface User {
  expiresIn?: string;
  _id: string;
  name: string;
  cpf: string;
  email: string;
  role: string;
  password: string;
  graduation: string;
  commision: number;
  balance: number;
  phone: string;
  createdAt?: string;
  __v?: number;
  avatar?: string;
  referencia?: string;
  bairro?: string;
  dataNascimento?: string;
  token?: string;
  address?: {
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    postalCode: string;
  };
  banckAccount?: {
    name: string;
    cpf: string;
    ag: number;
    cc: number;
    dv: string;
    pix: string;
  };
}

interface IContextApi {
  isAuthenticated: boolean;
  loginRequest: (email: string, password: string) => void;
  logoutRequest: () => void;
  user?: User | null;
  profileEditAgent: (id: string, data: User) => void;
  editAgentProfile: boolean;
  setEditAgentProfile: (
    action: boolean | ((action: boolean) => boolean)
  ) => void;
  dimensions: {
    width: number;
    height: number;
  };
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getAllTransactionsByUserId: (userId: string) => void;
  transactions: any[];
  getAllCommissionsByUserId: (userId: string) => void;
  commissions: any;
  getAllProducts: () => void;
  getAllProductImages: (id: string) => void;
  clearProductFiltered: () => void;
  addProductRequest: (product: AddCrudProduct) => void;
  editProductRequest: (product: EditCrudProduct) => void;
  deleteProductRequest: (id: string) => void;
  getAdressByPostalCode: (postalCode: string) => void;
  getAllStates: (idUf?: string) => void;
  getCitiesByUf: (ufId: string) => void;
  getSpheresByUser: (userId: string) => void;
  getAllCareer: () => void;
  getAllFaq: () => void;
  career?: Career;
  allFaq: Faq[];
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
      active: boolean;
      description: string;
      price: number;
      auff: number;
      imageUrls: string[];
      isCommissionable: boolean;
      directCommissionValue?: number;
      commissionType: string;
      createUser: boolean;
      commissionDistributionSpheres?: number[];
      commissionDistributionGroup?: number[];
      commissionDistributionCarrer: number[];
      shippingValues?: {
        width: number;
        height: number;
        length: number;
        weight: number;
      };
      digitalProduct: boolean;
      freeShipping: boolean;
      recurrence: string;
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
    directCommissionValue?: number;
    commissionType: string;
    createUser: boolean;
    commissionDistributionSpheres?: number[];
    commissionDistributionGroup?: number[];
    commissionDistributionCarrer: number[];
    shippingValues?: {
      width: number;
      height: number;
      length: number;
      weight: number;
    };
    digitalProduct: boolean;
    freeShipping: boolean;
    recurrence: string;
  };
  productImages: IFile[];
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
  spheresResp: {
    userId: string;
    role: string;
    name: string;
    email: string;
    children: any[];
    avatar: string;
  };
  startTransaction: (
    formData: FormDataTransaction,
    startTransaction: ProductDetailsContentProps["saleIdentification"]
  ) => Promise<void>;
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
  getAllTransactionsByUserId: (userId: string) => {},
  transactions: [],
  getAllCommissionsByUserId: (userId: string) => {},
  commissions: undefined,
  profileEditAgent: (id: string, data: User) => {},
  editAgentProfile: false,
  setEditAgentProfile: (action: boolean | ((action: boolean) => boolean)) => {},
  getAllProducts: () => {},
  getAllProductImages: (id: string) => {},
  productImages: [],
  addProductRequest: () => {},
  editProductRequest: () => {},
  clearProductFiltered: () => {},
  deleteProductRequest: () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
  getAdressByPostalCode: (postalCode: string) => {},
  getAllStates: (idUf?: string) => {},
  getCitiesByUf: (ufId: string) => {},
  getSpheresByUser: (userId: string) => {},
  getAllCareer: () => {},
  getAllFaq: () => {},
  career: undefined,
  allFaq: [] as Faq[],
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
      active: false,
      price: 0,
      auff: 0,
      imageUrls: [""],
      isCommissionable: false,
      directCommissionValue: 0,
      commissionType: "",
      createUser: false,
      commissionDistributionSpheres: [],
      commissionDistributionGroup: [],
      commissionDistributionCarrer: [],
      shippingValues: undefined,
      digitalProduct: false,
      freeShipping: false,
      recurrence: "",
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
    directCommissionValue: 0,
    commissionType: "",
    createUser: false,
    commissionDistributionSpheres: [],
    commissionDistributionGroup: [],
    commissionDistributionCarrer: [],
    shippingValues: undefined,
    digitalProduct: false,
    freeShipping: false,
    recurrence: "",
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
    userId: "",
    role: "",
    name: "",
    email: "",
    children: [],
    avatar: "",
  },
  startTransaction: async (
    formData: FormDataTransaction,
    startTransaction: ProductDetailsContentProps["saleIdentification"]
  ) => {},
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
  const [transactions, setTransactions] = useState<any[]>([]);
  const [commissions, setCommissions] = useState<any[]>();
  const [productImages, setProductImages] = useState<IFile[]>([]);
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
  const [allFaq, setAllFaq] = useState<Faq[]>([]);
  const [editAgentProfile, setEditAgentProfile] = useState(false);

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

  const getAllTransactionsByUserId = useCallback((userId: string) => {
    const request = getTransactionsByUserId(userId);
    toast.promise(request, {
      pending: {
        render() {
          return "Carregando...";
        },
      },
      success: {
        render({ data }: any) {
          //TODO
          setTransactions(data?.data);
          return "Transações carregadas com sucesso!";
        },
      },
      error: {
        render({ data }: any) {
          //TODO
          return "Falha ao carregar transações!";
        },
      },
    });
  }, []);

  const getAllCommissionsByUserId = useCallback((userId: string) => {
    const request = getCommissionsByUserId(userId);
    toast.promise(request, {
      pending: {
        render() {
          return "Carregando...";
        },
      },
      success: {
        render({ data }: any) {
          //TODO
          setCommissions(data?.data);
          return "Comissões carregadas com sucesso!";
        },
      },
      error: {
        render({ data }: any) {
          //TODO
          return "Falha ao carregar comissões!";
        },
      },
    });
  }, []);

  const startTransaction = useCallback(
    async (
      formData: FormDataTransaction,
      saleIdentification: ProductDetailsContentProps["saleIdentification"]
    ) => {
      try {
        const payload = formatDataForApi(formData, productFiltered, adress);

        if (!payload) {
          toast.error(
            "Esta faltando uma informacao, por favor check o formulario e tente novamente"
          );
          return;
        }

        const { checkouts } = await submitTransaction(
          payload,
          saleIdentification
        );
        window.location.href = checkouts[0].payment_url;
      } catch (error: any) {
        toast.error("Erro ao procesar a compra", error);
      }
    },
    [productFiltered, adress]
  );

  const getAllProductImages = useCallback((id: string) => {
    getProductImages(id)
      .then((data: any) => {
        setProductImages(data?.data?.response);
      })
      .catch(() => {
        toast.error("Falha ao carregar imagens!");
      });
  }, []);

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
          setProducts(data?.data.products);
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
    setProductImages([]);
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
          setProductFiltered({
            ...data?.data.product,
            imageUrls: [...data?.data.imageUrls],
          });
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
    async (product: AddCrudProduct) => {
      const toastId = toast.loading("Carregando...");
      addProduct(product)
        .then((data: any) => {
          const id = data.data._id;

          uploadProductImage(id, product.files)
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
        })
        .catch(() => {
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

  const editProductRequest = useCallback(
    async (product: EditCrudProduct) => {
      const toastId = toast.loading("Carregando...");

      product.removedFiles.forEach(async (file) => {
        deleteFile(file.originalName);
      });

      if (product.newFiles.length > 0) {
        uploadProductImage(product.id, product.newFiles).then(() => {
          editProduct(product)
            .then(() => {
              toast.update(toastId, {
                render: "Produto editado com sucesso!",
                type: "success",
                isLoading: false,
                autoClose: 2000,
                closeButton: <X size={16} color="#8B8B8B" />,
                closeOnClick: true,
              });
              navigate("/admin/products");
            })
            .catch(() => {
              toast.update(toastId, {
                render: "Falha ao editar produto!",
                type: "error",
                isLoading: false,
                autoClose: 2000,
                closeButton: <X size={16} color="#8B8B8B" />,
                closeOnClick: true,
              });
            });
        });
      } else {
        editProduct(product)
          .then(() => {
            toast.update(toastId, {
              render: "Produto editado com sucesso!",
              type: "success",
              isLoading: false,
              autoClose: 2000,
              closeButton: <X size={16} color="#8B8B8B" />,
              closeOnClick: true,
            });
            navigate("/admin/products");
          })
          .catch(() => {
            toast.update(toastId, {
              render: "Falha ao editar produto!",
              type: "error",
              isLoading: false,
              autoClose: 2000,
              closeButton: <X size={16} color="#8B8B8B" />,
              closeOnClick: true,
            });
          });
      }
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
    const request = getSpheres(userId);
    toast.promise(request, {
      pending: {
        render() {
          return "Carregando...";
        },
      },
      success: {
        render({ data }: any) {
          setSpheresResp(data?.data);
          return "";
        },
        style: {
          display: "none",
        },
      },
      error: {
        render({ data }: any) {
          //TODO
          return "Falha ao carregar Esferas!";
        },
      },
    });
  }, []);

  const getAllFaq = useCallback(() => {
    const request = getFaq();
    toast.promise(request, {
      pending: {
        render() {
          return "Carregando...";
        },
      },
      success: {
        render({ data }: any) {
          //TODO
          setAllFaq(data?.data);
          return "";
        },

        style: {
          display: "none",
        },
      },
      error: {
        render({ data }: any) {
          //TODO
          return "Falha ao carregar perguntas!";
        },
      },
    });
  }, []);

  const profileEditAgent = useCallback((id: string, data: User) => {
    const request = profileAgent(id, data);
    toast.promise(request, {
      pending: {
        render() {
          setEditAgentProfile(true);
          return "Carregando...";
        },
      },
      success: {
        render({ data }: any) {
          const token = user?.token;
          const dataUser = { ...data.data, token: token };
          setUser(dataUser);
          localStorage.setItem("user", JSON.stringify(dataUser));
          setEditAgentProfile(false);
          return "Perfil atualizado com  com sucesso!";
        },
      },
      error: {
        render({ data }: any) {
          setEditAgentProfile(true);
          return "Falha ao atualizar o perfil!";
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContextApi.Provider
      value={{
        isAuthenticated,
        loginRequest,
        user,
        logoutRequest,
        getAllProducts,
        addProductRequest,
        editProductRequest,
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
        getSpheresByUser,
        getAllCareer,
        career,
        clearProductFiltered,
        dimensions,
        getAllProductImages,
        productImages,
        getAllFaq,
        startTransaction,
        allFaq,
        getAllTransactionsByUserId,
        transactions,
        getAllCommissionsByUserId,
        commissions,
        profileEditAgent,
        editAgentProfile,
        setEditAgentProfile,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export default ContextProvider;
