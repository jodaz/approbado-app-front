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
