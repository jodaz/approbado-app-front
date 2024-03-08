import * as React from 'react';
import { Calendar } from '@approbado/lib/icons'
import { useMediaQuery, Button } from '@material-ui/core'
import { listSchedules } from '@approbado/lib/services/schedules.services'
import { useSchedulesDispatch } from '@approbado/lib/hooks/useSchedules'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import LinkBehavior from '@approbado/lib/components/LinkBehavior';
import Aside from './aside'
import Default from '../Default'
import TabbedList from '@approbado/lib/components/TabbedList'
import Box from '@material-ui/core/Box';

const tags = [
    {
        name: 'Pruebas',
        pathname: '/dashboard'
    },
    {
        name: 'Agenda',
        pathname: '/dashboard/schedules'
    },
    {
        name: 'Puntajes',
        pathname: '/dashboard/ranking'
    },
    {
        name: 'Pruebas realizadas',
        pathname: '/dashboard/completed'
    }
]

export default function Dashboard({ children }) {
    const { user, isAuth } = useUserState()
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
    const { fetchSchedules: setSchedules } = useSchedulesDispatch();

    const fetchSchedules = React.useCallback(async () => {
        const { success, data } = await listSchedules()

        if (success) {
            setSchedules(data);
        }
    }, []);

    React.useEffect(() => { fetchSchedules() }, [])

    return (
        <Default>
            <Box display="flex" p={isSmall ? '0' : '2rem 0'}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%'
                }}>
                    <Box sx={{
                        margin: '1rem 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Box sx={{
                            fontWeight: 600,
                            fontSize: '2rem',
                        }}>
                            Home
                        </Box>
                        {isSmall && (
                            <Button
                                component={LinkBehavior}
                                to='/schedules'
                            >
                                <Calendar />
                            </Button>
                        )}
                    </Box>
                    <TabbedList tags={tags} />
                    {children}
                </Box>
                {(isAuth && !isSmall) && <Aside isSmall={isSmall} user={user} />}
            </Box>
        </Default>
    )
}
