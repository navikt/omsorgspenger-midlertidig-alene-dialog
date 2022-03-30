import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { getEnvironmentVariable } from '@navikt/sif-common-core/lib/utils/envUtils';
import { isUnauthorized, isForbidden } from '@navikt/sif-common-core/lib/utils/apiUtils';

export const defaultAxiosConfig = {
    withCredentials: true,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

axios.defaults.baseURL = getEnvironmentVariable('API_URL');
axios.defaults.withCredentials = true;
axios.interceptors.request.use((config) => {
    return config;
});

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error: AxiosError) => {
        if (isForbidden(error) || isUnauthorized(error)) {
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);

export enum ApiEndpoint {
    'soker' = 'oppslag/soker?ytelse=omsorgspenger_midlertidig_alene',
    'mellomlagring' = 'mellomlagring/OMSORGSPENGER_MIDLERTIDIG_ALENE',
    'barn' = 'oppslag/barn?ytelse=omsorgspenger_midlertidig_alene',
    'sendSoknad' = 'omsorgspenger-midlertidig-alene/innsending',
}

const api = {
    get: <ResponseType>(endpoint: ApiEndpoint, paramString?: string, config?: AxiosRequestConfig) => {
        const url = `${endpoint}${paramString ? `?${paramString}` : ''}`;
        return axios.get<ResponseType>(url, config || defaultAxiosConfig);
    },
    post: <DataType = any, ResponseType = any>(endpoint: ApiEndpoint, data: DataType) =>
        axios.post<ResponseType>(endpoint, data, defaultAxiosConfig),
};

export default api;
