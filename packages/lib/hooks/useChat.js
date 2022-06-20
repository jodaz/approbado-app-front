import { useDispatch, useSelector } from 'react-redux';
import {
    SET_CHATLIST,
    SET_CURRENT_CHAT,
    DELETE_CHAT,
    SET_CHAT_ID
} from '../actions';

export const useChatState = () => {
    const store = useSelector(state => state);

    return store.chat
};

export const useChatDispatch = () => {
    const dispatch = useDispatch();

    return {
        setChat: data => dispatch({
            type: SET_CURRENT_CHAT,
            payload: data
        }),
        setChatlist: data => dispatch({
            type: SET_CHATLIST,
            payload: data
        }),
        deleteChat: model => dispatch({
            type: DELETE_CHAT,
            payload: model
        }),
        setChatID: id => dispatch({
            type: SET_CHAT_ID,
            payload: id
        })
    }
}
