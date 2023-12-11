import defaultAxios from 'axios';
import CONFIG_NAMES from '../configs'
console.log(CONFIG_NAMES)
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
const interceptorsFunc = (config) => {
    const token = localStorage.getItem(CONFIG_NAMES.AUTH_TOKEN);

    const newConfig = config;

    // When a 'token' is available set as token.
    if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
    }

    return newConfig;
};

jsonInstance.interceptors.request.use(interceptorsFunc, (err) => Promise.reject(err));
blobInstance.interceptors.request.use(interceptorsFunc, (err) => Promise.reject(err));

export {
    jsonInstance as apiProvider,
    blobInstance as fileProvider
}
