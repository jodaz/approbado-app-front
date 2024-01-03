import { User } from './models';

export interface IAuth {
    isAuth: boolean;
    token: string | null;
    user: User | null;
    loading: boolean;
}

export type AuthContextType = {
    state: IAuth,
    dispatch: any
}

export interface IToast {
    isOpen: boolean;
    color: string;
    message: string;
}

export type ToastContextType = {
    state: IToast,
    dispatch: any
}
