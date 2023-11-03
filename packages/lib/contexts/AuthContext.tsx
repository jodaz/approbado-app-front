import * as React from 'react'
import { IAuth, AuthContextType } from '../types/providers';
import { getUserProfile, loginUser } from '../services/auth.services';
import { IComp } from '../types';
import CONFIG_NAMES from '../env';
import * as SecureStore from 'expo-secure-store';

enum AuthActionType {
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT',
    SET_USER = 'SET_USER',
    TOGGLE_LOADING_USER = 'TOGGLE_LOADING_USER'
}

interface AuthAction {
    type: AuthActionType;
    payload: any;
}

const initialState: IAuth = {
    isAuth: false,
    user: null,
    token: '',
    loading: false
}

const setLocalCredentials = async (token: string) => {
    await SecureStore.setItemAsync(CONFIG_NAMES.AUTH_TOKEN, token);

    return true;
}

const AuthContext = React.createContext<AuthContextType>({ state: initialState, dispatch: () => null })

const getInitialState = async () => {
    const localInitialState = initialState;
    const token = await SecureStore.getItemAsync(CONFIG_NAMES.AUTH_TOKEN);

    if (token) {
        localInitialState.token = token;
    }

    return localInitialState;
}

function authReducer(state: IAuth, action: AuthAction): IAuth {
    switch (action.type) {
        case AuthActionType.LOGIN: {
            return {
                ...state,
                token: action.payload.token,
                isAuth: true
            }
        }
        case AuthActionType.TOGGLE_LOADING_USER: {
            return {
                ...state,
                loading: !state.loading
            }
        }
        case AuthActionType.SET_USER: {
            return {
                ...state,
                user: action.payload,
                isAuth: true
            }
        }
        case AuthActionType.LOGOUT: {
            return initialState
        }
        default: {
            console.log(`Unhandled action type: ${action.type}`)
            return initialState;
        }
    }
}

export const AuthProvider: React.FC<IComp> = ({ children }) => {
    //@ts-ignore
    const [state, dispatch] = React.useReducer(authReducer, getInitialState())

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = React.useContext(AuthContext)

    if (context === undefined) {
        throw new Error('useAuth must be used within a AuthProvider')
    }

    return context
}

export async function getUser(dispatch: any) {
    dispatch({
        type: AuthActionType.TOGGLE_LOADING_USER
    })

    const { success, status, data } = await getUserProfile()
    console.log(data)
    if (success) {
        dispatch({
            type: AuthActionType.SET_USER,
            payload: data
        })

        return { success: true }
    } else {
        return { success, status, data};
    }
}

export async function login(dispatch: any, values: any) {
    const { success, status, data } = await loginUser(values);

    if (success) {
        dispatch({
            type: AuthActionType.LOGIN,
            payload: {
                token: data.token
            }
        })

        await setLocalCredentials(data.token)

        await getUser(dispatch)

        return { success: true };
    } else {
        return { success, status, data};
    }
}

export async function logout(dispatch: any) {
    dispatch({ type: AuthActionType.LOGOUT })

    await SecureStore.deleteItemAsync(CONFIG_NAMES.AUTH_TOKEN)

    return { success: true }
}
