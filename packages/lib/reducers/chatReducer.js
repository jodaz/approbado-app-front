import {
    SET_CHATLIST,
    DELETE_CHAT,
    SET_CHAT_ID,
    SET_CURRENT_CHAT,
    ACCEPT_CHAT_INVITING,
    REQUEST_CHAT,
    SEND_MESSAGE
} from '../actions';

const initialState = {
    isChatSelected: false, // If user selected a chat
    chats: [], // Chat list
    current: {
        chatStatus: null,
        messages: null
    },
    total: 0,
    selected: null // ID of chat selected
}

const chatReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case REQUEST_CHAT:
            return {
                ...previousState,
                current: action.payload,
                selected: action.payload.id,
                isChatSelected: false
            }
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
        case SEND_MESSAGE: {
            return {
                ...previousState,
                current: {
                    ...previousState.current,
                    messages: [
                        ...previousState.current.messages,
                        action.payload
                    ]
                }
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
                chats: previousState.chats.filter(chat => chat.id != action.payload.chat),
                current: action.payload.is_current ? null : previousState.current,
                total: previousState.total - 1,
                selected: null
            };
        case ACCEPT_CHAT_INVITING:
            return {
                ...previousState,
                current: {
                    ...previousState.current,
                    chatStatus: action.payload
                }
            }
        default:
            return previousState;
    }
}

export default chatReducer;

