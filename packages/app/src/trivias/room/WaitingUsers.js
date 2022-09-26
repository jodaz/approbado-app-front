import * as React from 'react'
import { useTriviaState, useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import { useParams } from 'react-router-dom'
import BalanceIcon from '@approbado/lib/icons/BalanceIcon'
import UserCardCheck from '../components/UserCardCheck'

const users = [
    {
        user_name: '@antonio',
        status: 'pending'
    },
    {
        user_name: '@maria_antonieta',
        status: 'completed'
    },
    {
        user_name: '@antonio',
        status: 'pending'
    },
    {
        user_name: '@maria_antonieta_delas_nieves',
        status: 'completed'
    },
    {
        user_name: '@antonio',
        status: 'pending'
    },
    {
        user_name: '@maria_antonieta_delas_nieves',
        status: 'completed'
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
    const { room: { loaded, ...restRoom } } = useTriviaState();
    const { setRoom } = useTriviaDispatch()
    const { token } = useParams()
    const classes = useStyles();
    const pendingUsers = getUsersByStatus(users, 'pending')
    const completedUsers = getUsersByStatus(users, 'completed')

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
                        <BalanceIcon />
                        <Box marginLeft='0.5rem'>Derecho laboral</Box>
                    </Box>
                </Box>
                <Box className={classes.subthemeName}>
                    Tema en especifico #1
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
