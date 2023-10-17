import defaultAxios from 'axios';
import CONFIG_NAMES from '../env'

const jsonInstance = defaultAxios.create({
    baseURL: "http://192.168.250.13:4000",
    withCredentials: false
});

const blobInstance = defaultAxios.create({
    baseURL: CONFIG_NAMES.SOURCE,
    withCredentials: false,
    responseType: 'blob'
});

// Request interceptor
const interceptorsFunc = (config) => {
    // const token = localStorage.getItem(CONFIG_NAMES.AUTH_TOKEN);

    // const newConfig = config;

    // // When a 'token' is available set as token.
    // if (token) {
    //     newConfig.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
};

console.log(process.env)

jsonInstance.interceptors.request.use(interceptorsFunc, (err) => Promise.reject(err));
blobInstance.interceptors.request.use(interceptorsFunc, (err) => Promise.reject(err));

export {
    jsonInstance as apiProvider,
    blobInstance as fileProvider
}
