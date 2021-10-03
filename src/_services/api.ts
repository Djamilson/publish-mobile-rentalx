import axios from 'axios';

import * as Device from 'expo-device';

import { database } from '../database';
import { User as ModelUser } from '../database/model/User';

const device = Device.modelName;

import localhostConfig from '../_config/host';

const { WEBHOST } = localhostConfig;

let baseURL = `${WEBHOST}`;

/*
if (__DEV__) {
  baseURL = `http://${LOCALHOST}:${PORT}`;
}*/

// depois só remover essa linha
//baseURL = `WEBHOST`;
//baseURL = `http://${LOCALHOST}:${PORT}`;

let isRefreshing = false;

let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export function setupAPIClient() {
  const api = axios.create({
    baseURL,
  });

  api.interceptors.response.use(
    (res) => {
      return res;
    },
    async (error) => {
      const originalRequest = error.config;

      if (
        error?.response?.status === 401 &&
        error?.response?.data?.message?.name === 'TokenExpiredError' &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;

              return api.request(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;
        let refresh_token: string;
        let userSelected: ModelUser[];

        try {
          const userCollection = database.get<ModelUser>('users');

          await database.write(async () => {
            userSelected = await userCollection.query().fetch();
            refresh_token = userSelected[0].refresh_token;
          });
        } catch (err) {}

        return new Promise((resolve, reject) => {
          api
            .post(`refresh`, {
              token: refresh_token,
              device,
            })
            .then(async (res: any) => {
              const { token, refreshToken } = res.data;

              await database.write(async () => {
                await userSelected[0].update((userData) => {
                  (userData.token = token),
                    (userData.refresh_token = refreshToken);
                });
              });

              api.defaults.headers.authorization = `Bearer ${token}`;

              processQueue(null, token);
              resolve(api(originalRequest));
            })
            .catch((err: any) => {
              processQueue(err, null);
              reject(err);
            })
            .then(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    },
  );

  return api;
}
