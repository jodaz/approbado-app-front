import * as React from 'react'
import { useSchedulesDispatch } from '@approbado/lib/hooks/useSchedules'
import { createSchedule } from '@approbado/lib/services/schedules.services'
import ScheduleForm from './ScheduleForm'
import SuccessDialog from './SuccessDialog'

const ScheduleCreate = () => {
    const [openDialog, setOpenDialog] = React.useState(false)
    const { setSchedule } = useSchedulesDispatch();

    const handleSubmit = async (values) => {
        const { time, day, starts_at, notify_before, ...rest } = values;

        const { success, status, data } = await createSchedule({
            starts_at: `${starts_at} ${time}`,
            notify_before:  notify_before ? true : false,
            ...rest
        });

        if (success) {
            setOpenDialog(true)
            setSchedule(data)
        } else {
            if (status == 422) {
                return data;
            }
        }
    }

    return (
        <>
            <ScheduleForm
                handleSubmit={handleSubmit}
            />
            <SuccessDialog open={openDialog} handleClose={() => setOpenDialog(false)} />
        </>
    )
}

export default ScheduleCreate
