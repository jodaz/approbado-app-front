import * as React from 'react';
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box';
import EmptySchedule from './EmptySchedule'
import ScheduledTriviaCard from './ScheduledTriviaCard'
import { useSchedulesState } from '@approbado/lib/hooks/useSchedules'
import { useMediaQuery } from '@material-ui/core'

const ScheduleNavbar = () => {
    const schedules = useSchedulesState();
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )

    return (
        <Box sx={{
            width: isSmall ? '100%' : '30%',
            padding: isSmall ? '2rem 0 0 0' : '0 1rem 0 1rem'
        }}>
            <Box sx={{
                fontWeight: '700',
                fontSize: '1.5rem'
            }}>
                Agenda mensual
            </Box>
            {(schedules.length)
                ? (
                    <>
                        {schedules.map((schedule, key) =>
                            <ScheduledTriviaCard key={key} {...schedule} />
                        )}
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
