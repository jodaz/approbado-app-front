import { useDispatch, useSelector } from 'react-redux';
import {
    FETCH_SCHEDULES,
    SET_SCHEDULE,
    DELETE_SCHEDULE,
    UPDATE_SCHEDULE
} from '../actions';

export const useSchedulesState = () => {
    const store = useSelector(state => state);

    return store.schedules;
};

export const useSchedulesDispatch = () => {
    const dispatch = useDispatch();

    return {
        setSchedule: data => dispatch({
            type: SET_SCHEDULE,
            payload: data
        }),
        editSchedule: data => dispatch({
            type: UPDATE_SCHEDULE,
            payload: data
        }),
        fetchSchedules: data => dispatch({
            type: FETCH_SCHEDULES,
            payload: data
        }),
        unsetSchedule: data => dispatch({
            type: DELETE_SCHEDULE,
            payload: data
        })
    }
}
