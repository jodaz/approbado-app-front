import { useDispatch, useSelector } from 'react-redux';
import {
    SET_DIALOG,
    UNSET_DIALOG
} from '../actions';

export const useDialogState = name => {
    const store = useSelector(state => state);

    return (store.dialog.name === name) && store.dialog
};

export const useDialogDispatch = (name, data = null) => {
    const dispatch = useDispatch();

    return {
        setDialog: () => dispatch({
            type: SET_DIALOG,
            payload: { name: name, data: data }
        }),
        unsetDialog: () => dispatch({
            type: UNSET_DIALOG,
            payload: name
        })
    }
}
