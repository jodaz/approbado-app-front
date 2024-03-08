import * as React from 'react'
import SuccessDialog from './SuccessDialog'
import { useSchedulesDispatch } from '@approbado/lib/hooks/useSchedules'
import { useParams } from 'react-router-dom'
import ScheduleForm from './ScheduleForm'
import { format, parseISO } from 'date-fns'
import { getSchedule, editSchedule } from '@approbado/lib/services/schedules.services'

const ScheduleEdit = () => {
    const { id } = useParams();
    const [openDialog, setOpenDialog] = React.useState(false)
    const { editSchedule: editScheduleStore } = useSchedulesDispatch();
    const [record, setRecord] = React.useState({})

    const handleSubmit = React.useCallback(async (values) => {
        const { time, day, starts_at, notify_before, ...rest } = values;

        const {
            success,
            status,
            data
        } = await editSchedule(id, {
            starts_at: `${starts_at} ${time}`,
            notify_before:  notify_before ? true : false,
            ...rest
        });

        if (success) {
            formatAndSetRecord(data);
            setOpenDialog(true)
            editScheduleStore(data);
        } else {
            if (status == 422) {
                return data;
            }
        }
    }, [id])

    const fetchRecord = React.useCallback(async (scheduleID) => {
        const { success, data } = await getSchedule(scheduleID)

        if (success) {
            formatAndSetRecord(data);
        }
    }, []);

    const formatAndSetRecord = data => {
        const { starts_at, notify_before, subtheme, ...rest } = data
        const time = format(parseISO(starts_at), 'p');
        const date = format(parseISO(starts_at), 'MM-dd-uuuu')

        setRecord({
            ...rest,
            time: time,
            trivia_id: subtheme.trivia_id,
            starts_at: date,
            notify_before: notify_before ? ['notify_before'] : undefined
        });
    }

    React.useEffect(async () => {
        if (id) {
            await fetchRecord(id);
        }
    }, [id])

    if (id && !Object.entries(record).length) return null;

    return (
        <>
            <ScheduleForm record={record} handleSubmit={handleSubmit} />
            <SuccessDialog
                open={openDialog}
                handleClose={() => setOpenDialog(false)}
                title='¡Acaba de editar una trivia!'
            />
        </>
    )
}

export default ScheduleEdit
