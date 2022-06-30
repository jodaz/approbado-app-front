import { useDispatch, useSelector } from 'react-redux';
import {
    SET_CHATLIST,
    SET_CURRENT_CHAT,
    DELETE_CHAT,
    SET_CHAT_ID,
    ACCEPT_CHAT_INVITING,
    REQUEST_CHAT
} from '../actions';

export const useChatState = () => {
    const store = useSelector(state => state);

    return store.chat
};

export const useChatDispatch = () => {
    const dispatch = useDispatch();

    return {
        requestChat: data => dispatch({
            type: REQUEST_CHAT,
            payload: data
        }),
        setChat: data => dispatch({
            type: SET_CURRENT_CHAT,
            payload: data
        }),
        setChatlist: data => dispatch({
            type: SET_CHATLIST,
            payload: data
        }),
        deleteChat: (model, is_current) => dispatch({
            type: DELETE_CHAT,
            payload: {
                ...model,
                is_current: is_current
            }
        }),
        setChatID: id => dispatch({
            type: SET_CHAT_ID,
            payload: id
        }),
        acceptChat: status => dispatch({
            type: ACCEPT_CHAT_INVITING,
            payload: status
        })
    }
}
