import api from "../api";
import Filters from "../../libs/Filters";
import { User } from "../../contexts";

const profileAgent = async (id: string, data: User) => {
  return new Promise((resolve, reject) => {
    api
      .put(`/user/${id}`, {
        name: data.name,
        cpf: data.cpf,
        password: data.password,
        phone: Filters.clearStringOnlyNumbers(data.phone),
        email: data.email,
        role: data.role,
        address: data.address
          ? {
              street: data.address.street,
              number: data.address.number,
              complement: data.address.complement,
              city: data.address.city,
              state: data.address.state,
              postalCode: data.address.postalCode,
            }
          : undefined,
        bankAccount: data?.bankAccount ? data?.bankAccount : undefined,
      })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const listBanks = async () => {
  return new Promise((resolve, reject) => {
    api
      .get("/lists/banks")
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export { profileAgent, listBanks };
