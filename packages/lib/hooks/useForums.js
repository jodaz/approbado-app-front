import { useDispatch, useSelector } from 'react-redux';
import {
    DELETE_FORUM,
    FETCH_FORUMS
} from '../actions';

export const useForumsState = () => {
    const store = useSelector(state => state);
    console.log(store.forums)
    return store.forums;
};

export const useForumsDispatch = () => {
    const dispatch = useDispatch();

    return {
        set: data => dispatch({
            type: FETCH_FORUMS,
            payload: data
        }),
        unset: record => dispatch({
            type: DELETE_FORUM,
            payload: record
        })
    }
}
