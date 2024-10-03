import defaultAxios from 'axios';
import ENV from '../env'
import AsyncStorage from '@react-native-async-storage/async-storage';
console.log(ENV)
const jsonInstance = defaultAxios.create({
    baseURL: ENV.API,
    withCredentials: false
});

const blobInstance = defaultAxios.create({
    baseURL: ENV.API,
    withCredentials: false,
    responseType: 'blob'
});

// Request interceptor
const interceptorsFunc = async (config) => {
    // const token = localStorage.getItem();
    const token = await AsyncStorage.getItem(ENV.AUTH_TOKEN);

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
