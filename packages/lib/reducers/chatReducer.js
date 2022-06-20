import { UNSET_CHAT, SET_CHAT } from '../actions';

const initialState = {
    status: false,
    chats: [],
    data: {}
}

const chatReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case SET_CHAT:
            return {
                status: true,
                data: action.payload
            }
        case UNSET_CHAT:
            return initialState;
        default:
            return previousState;
    }
}

export default chatReducer;

