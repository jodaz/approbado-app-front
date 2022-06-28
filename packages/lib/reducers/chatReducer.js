import {
    SET_CHATLIST,
    DELETE_CHAT,
    SET_CHAT_ID,
    SET_CURRENT_CHAT
} from '../actions';

const initialState = {
    isChatSelected: false,
    chats: [],
    current: {
        messages: null,
        notification: null
    },
    total: 0,
    selected: null
}

const chatReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case SET_CHATLIST:
            return {
                ...previousState,
                chats: action.payload,
                total: action.payload.length
            }
        case SET_CHAT_ID: {
            return {
                ...previousState,
                selected: action.payload
            }
        }
        case SET_CURRENT_CHAT:
            return {
                ...previousState,
                isChatSelected: true,
                current: action.payload
            }
        case DELETE_CHAT:
            return {
                ...previousState,
                isChatSelected: false,
                chats: [...previousState.chats.filter(({ id }) => id != action.payload.id)],
                current: null,
                total: previousState.total - 1,
                selected: null
            };
        default:
            return previousState;
    }
}

export default chatReducer;

