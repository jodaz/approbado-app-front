import * as React from 'react'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import socketIOClient from "socket.io-client";
import UserCardCheck from '../components/UserCardCheck'
import CONFIG_NAMES from '@approbado/lib/configs'
import {
    Balance
} from '@approbado/lib/icons'

const users = [
    {
        user_name: '@test',
        status: 'completed'
    },
    {
        user_name: '@otrousuario',
        status: 'pending'
    }
]

const getUsersByStatus = (arr, state) => arr.filter(({ status }) => status === state)

const titleStyles = {
    fontSize: '1.1rem',
    fontWeight: 600,
    lineHeight: '22px',
    marginBottom: '0.8rem'
}

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: '1rem',
        width: '50%',
        color: theme.palette.info.dark,
        [theme.breakpoints.down('sm')]: {
            width: '80%'
        }
    },
    subthemeName: {
        ...titleStyles,
        fontSize: '1rem',
        backgroundColor: '#EAEAEA',
        padding: '0.3rem',
        borderRadius: '6px',
        width: 'fit-content'
    },
    header: {
        width: '100%',
        marginBottom: '1rem'
    },
    container: {
        width: '50%',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    triviaName: {
        ...titleStyles,
        display: 'flex',
        alignItems: 'center'
    },
    sent: {
        ...titleStyles,
        color: theme.palette.info.success
    },
    wait: {
        ...titleStyles,
        color: theme.palette.info.main
    }
}))

const WaitingUsers = () => {
    const { room: { loaded, token, ...restRoom }, trivia } = useTriviaState();
    const classes = useStyles();
    const pendingUsers = getUsersByStatus(users, 'pending')
    const completedUsers = getUsersByStatus(users, 'completed')

    React.useEffect(() => {
        const socket = socketIOClient(CONFIG_NAMES.SOURCE);

        socket.on("room", data => console.log(data));
        socket.emit('room', { token: token })

        return () => socket.disconnect();
    }, [])

    return (
        <Box sx={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <Box className={classes.root}>
                <Box className={classes.header}>
                    <Box className={classes.triviaName}>
                        <Balance />
                        <Box marginLeft='0.5rem'>{trivia.name}</Box>
                    </Box>
                </Box>
                <Box className={classes.subthemeName}>
                    {trivia.name} #1
                </Box>
                <Box className={classes.container}>
                    <Box className={classes.sent}>
                        Enviado
                    </Box>
                    {completedUsers.map(user => <UserCardCheck {...user} />)}
                    <Box className={classes.wait}>
                        En espera...
                    </Box>
                    {pendingUsers.map(user => <UserCardCheck {...user} />)}
                </Box>
            </Box>
        </Box>
    )
}

export default WaitingUsers
