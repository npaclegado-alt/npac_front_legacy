import { AxiosResponse } from "axios";
import api from "../api";

type TokenRefreshResponse = {
  token: string;
  expiresIn: string;
};

const login = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    api
      .post("auth", { email, password })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const tokenRefresh = async (
  refreshToken: string
): Promise<AxiosResponse<TokenRefreshResponse>> => {
  return api.post<TokenRefreshResponse>("auth/refresh-token", { refreshToken });
};

export { login, tokenRefresh };
