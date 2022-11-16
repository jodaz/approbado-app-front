import {
    DELETE_FORUM,
    FETCH_FORUMS
} from '../actions';

const initialState = {
    items: [],
    total: null
}

const forumsReducer = (
    previousState = initialState,
    action
) => {
    switch (action.type) {
        case FETCH_FORUMS:
            return {
                items: [...action.payload],
                total: action.payload.length
            }
        case DELETE_FORUM:
            return {
                items: [...previousState.items.filter(({ id }) => id != action.payload.id)],
                total: previousState.total - 1
            }
        default:
            return previousState;
    }
}

export default forumsReducer;
