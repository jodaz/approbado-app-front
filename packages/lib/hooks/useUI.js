import { useDispatch, useSelector } from 'react-redux';
import {
    TOGGLE_SIDEBAR,
    SHOW_NOTIFICATION,
    HIDE_NOTIFICATION
} from '../actions';

export const useUiState = () => {
    const store = useSelector(state => state);

    return store.ui;
};

export const useUiDispatch = () => {
    const dispatch = useDispatch();

    return {
        toggleSidebar: () => dispatch({
            type: TOGGLE_SIDEBAR
        }),
        hideNotification: () => dispatch({
            type: HIDE_NOTIFICATION
        }),
        showNotification: message => dispatch({
            type: SHOW_NOTIFICATION,
            payload: message
        })
    }
}
