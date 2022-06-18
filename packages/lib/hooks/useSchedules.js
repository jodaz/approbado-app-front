import { useDispatch, useSelector } from 'react-redux';
import { FETCH_SCHEDULES, SET_SCHEDULE, unsetSchedule } from '../actions';

export const useSchedulesState = () => {
    const store = useSelector(state => state);
    console.log(store.schedules)
    return store.schedules;
};

export const useSchedulesDispatch = () => {
    const dispatch = useDispatch();

    return {
        setSchedule: data => dispatch({
            type: SET_SCHEDULE,
            payload: data
        }),
        fetchSchedules: data => dispatch({
            type: FETCH_SCHEDULES,
            payload: data
        }),
        unsetSchedule: data => dispatch(unsetSchedule(data))
    }
}
