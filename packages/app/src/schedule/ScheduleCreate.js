import * as React from 'react'
import { JSONAxiosInstance as axios } from '@approbado/lib/api'
import SuccessDialog from './SuccessDialog'
import { useSchedulesDispatch } from '@approbado/lib/hooks/useSchedules'
import ScheduleForm from './ScheduleForm'

const ScheduleCreate = () => {
    const [openDialog, setOpenDialog] = React.useState(false)
    const { setSchedule } = useSchedulesDispatch();

    const handleSubmit = async (values) => {
        const { time, day, starts_at, notify_before, ...rest } = values;

        try {
            const { data } = await axios.post('/schedules', {
                starts_at: `${starts_at} ${time}`,
                notify_before:  notify_before ? true : false,
                ...rest
            })

            setOpenDialog(true)
            setSchedule(data)
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
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
