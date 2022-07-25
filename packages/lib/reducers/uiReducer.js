import {
    TOGGLE_SIDEBAR,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION
} from '../actions';

const initialState = {
    sidebarOpen: true,
    notification: {
        message: null
    }
}

const uiReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case TOGGLE_SIDEBAR:
            return {
                ...previousState,
                sidebarOpen: !previousState.sidebarOpen
            }
        case SHOW_NOTIFICATION:
            return {
                ...previousState,
                notification: {
                    message: action.payload
                }
            }
        case HIDE_NOTIFICATION:
            return {
                ...previousState,
                notification: initialState.notification
            }
        default:
            return initialState;
    }
}

export default uiReducer;
