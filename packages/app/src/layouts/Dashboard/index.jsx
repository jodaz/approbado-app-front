import * as React from 'react';
import TabbedList from '@approbado/lib/components/TabbedList'
import Box from '@material-ui/core/Box';
import { useMediaQuery, Button } from '@material-ui/core'
import Aside from './aside'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import Default from '../Default'
import useFetch from '@approbado/lib/hooks/useFetch'
import { useSchedulesDispatch } from '@approbado/lib/hooks/useSchedules'
import CalendarIcon from '@approbado/lib/icons/CalendarIcon'
import LinkBehavior from '@approbado/lib/components/LinkBehavior';

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
    const { data } = useFetch(`/schedules/user/${user.id}`);
    const { fetchSchedules } = useSchedulesDispatch();

    React.useEffect(() => {
        if (data.length) {
            fetchSchedules(data);
        }
    }, [data])

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
                                <CalendarIcon />
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
