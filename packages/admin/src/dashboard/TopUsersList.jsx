import * as React from 'react';
import { listUsers } from '@approbado/lib/services/users.services'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import UserCard from './UserCard'
import ErrorMessage from '@approbado/lib/components/ErrorMessage'
import Box from '@material-ui/core/Box'

const TopUsersList = () => {
    const [users, setUsers] = React.useState([])

    const fetchTopUsers = async () => {
        const { success, data } = await listUsers({
            sort: { field: 'points', order: 'DESC'},
            filter: { is_registered: true }
        })

        if (success) {
            setUsers(data)
        }
    }

    React.useEffect(() => { fetchTopUsers() }, [])

    return (
        <Grid container>
            <Grid item xs={12} sm={6} md={4}>
                <Typography component='h3' variant={'h6'}>
                    Usuarios destacados
                </Typography>
            </Grid>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingTop: '1rem'
            }}>
                {(users.length) ? (
                    <Grid container>
                        {users.map((user, i) =>
                            <Grid item xs={12} sm={6} md={4}>
                                <UserCard data={user} index={i} />
                            </Grid>
                        )}
                    </Grid>
                ) : (
                    <ErrorMessage>
                        Aún no tenemos usuarios destacados.
                    </ErrorMessage>
                )}

                {(error) && (
                    <ErrorMessage>
                        Ha ocurrido un error en su solicitud.
                    </ErrorMessage>
                )}
            </Box>
        </Grid>
    )
}

export default TopUsersList
