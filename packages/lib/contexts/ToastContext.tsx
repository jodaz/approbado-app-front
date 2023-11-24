import * as React from 'react'
import { IToast, ToastContextType } from '../types/providers';
import { IComp } from '../types';

enum ToastActionType {
    OPEN_NOTIFICATION = 'OPEN_NOTIFICATION',
    CLOSE_NOTIFICATION = 'CLOSE_NOTIFICATION'
}

interface ToastAction {
    type: ToastActionType;
    payload: any;
}

const initialState: IToast = {
    isOpen: false,
    color: '',
    message: ''
}

const ToastContext = React.createContext<ToastContextType>({ state: initialState, dispatch: () => null })

function authReducer(state: IToast, action: ToastAction): IToast {
    switch (action.type) {
        case ToastActionType.OPEN_NOTIFICATION: {
            return {
                ...state,
                isOpen: true,
                message: action.payload.message,
                color: action.payload.color
            }
        }
        case ToastActionType.CLOSE_NOTIFICATION: {
            return initialState
        }
        default: {
            console.log(`Unhandled action type: ${action.type}`)
            return initialState;
        }
    }
}

export const ToastProvider: React.FC<IComp> = ({ children }) => {
    //@ts-ignore
    const [state, dispatch] = React.useReducer(authReducer, initialState)

    return (
        <ToastContext.Provider value={{ state, dispatch }}>
            {children}
        </ToastContext.Provider>
    )
}

export function useToast() {
    const context = React.useContext(ToastContext)

    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider')
    }

    return context
}

export async function openToast(dispatch: any, color: string, message: string) {
    dispatch({
        type: ToastActionType.OPEN_NOTIFICATION,
        payload: {
            color: color ? color : 'success',
            message: message
        }
    })
}

export async function closeToast(dispatch: any) {
    dispatch({
        type: ToastActionType.CLOSE_NOTIFICATION
    })
}
