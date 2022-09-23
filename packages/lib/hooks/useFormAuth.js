import { useDispatch, useSelector } from 'react-redux';
import {
    SET_FORM_AUTH,
    UNSET_FORM_AUTH
} from '../actions';

export const useFormAuthState = () => {
    const store = useSelector(state => state);

    return store.formAuth;
};

export const useFormAuthDispatch = () => {
    const dispatch = useDispatch();

    return {
        setForm: data => dispatch({
            type: SET_FORM_AUTH,
            payload: data
        }),
        unsetForm: () => dispatch({
            type: UNSET_FORM_AUTH
        })
    }
}
