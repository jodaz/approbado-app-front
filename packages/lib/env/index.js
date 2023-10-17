import { NATIVE_ENV } from './native-env'

const dinamicallyLoadWebEnv = async () => {
    const module = await import('./web-env');

    return module.default;
};

// const CONFIG_NAMES = process.env.EXPO_PUBLIC_API_DOMAIN ? NATIVE_ENV : dinamicallyLoadWebEnv();
CONFIG_NAMES = NATIVE_ENV;

export default CONFIG_NAMES;
