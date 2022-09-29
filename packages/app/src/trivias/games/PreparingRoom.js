import * as React from 'react'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { JSONAxiosInstance as axios } from '@approbado/lib/api'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import { useParams } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'

const users = [
    {
        names: 'antonio',
        status: 'pending'
    },
    {
        names: 'maria_antonieta',
        status: 'completed'
    },
    {
        names: 'antonio',
        status: 'pending'
    },
]

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    player: {
        width: '7rem',
        height: '7rem'
    },
    otherPlayers: {
        width: '4rem',
        height: '4rem'
    },
    title: {
        color: theme.palette.info.main,
        fontWeight: 600
    }
}))

const PreparingRoom = () => {
    const { room: { loaded, ...restRoom } } = useTriviaState();
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box sx={{
                display: 'flex',
                padding: '1rem',
                alignItems: 'center',
                flexDirection: 'column',
                '& > *': {
                    marginTop: '2rem'
                }
            }}>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    margin: '1rem'
                }}>
                    <Avatar className={classes.player} />
                    <Box marginTop='1rem'>Antonella Pineda</Box>
                </Box>
                <Box fontWeight='700' fontSize='1.5rem'>VS</Box>
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    flexWrap: 'wrap'
                }}>
                    {users.map(user => (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '1rem'
                        }}>
                            <Avatar className={classes.otherPlayers} />
                            <Box sx={{ marginTop: '1rem' }}>
                                {user.names}
                            </Box>
                        </Box>
                    ))}
                </Box>
                <Box className={classes.title}>
                    Preparando sala...
                </Box>
            </Box>
        </Box>
    )
}

export default PreparingRoom
