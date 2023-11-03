import defaultAxios from 'axios';
import CONFIG_NAMES from '../env'
import * as SecureStore from 'expo-secure-store';

const jsonInstance = defaultAxios.create({
    baseURL: CONFIG_NAMES.SOURCE,
    withCredentials: false
});

const blobInstance = defaultAxios.create({
    baseURL: CONFIG_NAMES.SOURCE,
    withCredentials: false,
    responseType: 'blob'
});

// Request interceptor
const interceptorsFunc = async (config) => {
    // const token = localStorage.getItem();
    const token = await SecureStore.getItemAsync(CONFIG_NAMES.AUTH_TOKEN);

    const newConfig = config;

    // When a 'token' is available set as token.
    if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
    }

    return config;
};

jsonInstance.interceptors.request.use(interceptorsFunc, (err) => Promise.reject(err));
blobInstance.interceptors.request.use(interceptorsFunc, (err) => Promise.reject(err));

export {
    jsonInstance as apiProvider,
    blobInstance as fileProvider
}
