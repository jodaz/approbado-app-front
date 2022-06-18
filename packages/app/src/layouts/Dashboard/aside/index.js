import * as React from 'react';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import EmptySchedule from './EmptySchedule'
import ScheduledTriviaCard from './ScheduledTriviaCard'
import { useSchedulesState } from '@approbado/lib/hooks/useSchedules'

const ScheduleNavbar = ({ isSmall }) => {
    const schedules = useSchedulesState();
    console.log(schedules)
    if (isSmall) return null;

    return (
        <Box sx={{
            width: '30%',
            padding: '0 1rem'
        }}>
            <Box sx={{
                fontWeight: '700',
                fontSize: '1.5rem',
                width: '100%'
            }}>
                Agenda mensual
            </Box>
            {(schedules.length)
                ? (
                    <>
                        {schedules.map((schedule, key) => <ScheduledTriviaCard key={key} {...schedule} />)}
                    </>
                ) : <EmptySchedule />
            }
        </Box>
    );
}

ScheduleNavbar.propTypes = {
    isSmall: PropTypes.bool
}

export default ScheduleNavbar
