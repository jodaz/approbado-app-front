import { useDispatch, useSelector } from 'react-redux';
import {
    DELETE_FORUM,
    FETCH_FORUMS
} from '../actions';

export const useForumsState = () => {
    const store = useSelector(state => state);

    return store.forums;
};

export const useForumsDispatch = () => {
    const dispatch = useDispatch();

    return {
        set: data => dispatch({
            type: FETCH_FORUMS,
            payload: data
        }),
        deleteForums: id => dispatch({
            type: DELETE_FORUM,
            payload: id
        })
    }
}
