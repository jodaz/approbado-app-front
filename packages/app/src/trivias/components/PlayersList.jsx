import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import CONFIG_NAMES from '@approbado/lib/configs'
import makeStyles from '@material-ui/styles/makeStyles'
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from 'react-router-dom'
import { useUserState } from '@approbado/lib/hooks/useUserState';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '0 1rem',
        marginBottom: '2rem',
        marginTop: '-2rem',
        [theme.breakpoints.down('sm')]: {
            marginTop: '-1rem',
        }
    },
    usersContainer: {
        display: 'flex',
        width: 'fit-content',
        alignItems: 'end'
    },
    player: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textDecoration: 'none',
        color: 'black',
        fontWeight: 700,
        margin: '0 0.3rem'
    },
    playerPic: {
        width: '2.5rem',
        height: '2.5rem',
        [theme.breakpoints.down('sm')]: {
            width: '2rem',
            height: '2rem'
        }
    },
    title: {
        color: theme.palette.info.main,
        fontWeight: 600
    },
    mark: {
        height: '6px',
        borderRadius: '0px 0px 8px 8px',
        backgroundColor: theme.palette.info.main,
        width: '100%'
    }
}))

const PlayersList = ({ users }) => {
    const classes = useStyles();
    const { user: currUser } = useUserState();

    return (
        <Box className={classes.root}>
            <Box className={classes.usersContainer}>
                {users.map((user, i) => (
                    <Tooltip title={user.names}>
                        <Box
                            className={classes.player}
                            component={Link}
                            to={`/${user.user_name}`}
                        >
                            {currUser.id == user.id && <Box className={classes.mark} />}
                            <Avatar
                                src={`${CONFIG_NAMES.SOURCE}/${user.picture}`}
                                className={classes.playerPic}
                            />
                            <Box>
                                {`${i+1}°`}
                            </Box>
                        </Box>
                    </Tooltip>
                ))}
            </Box>
        </Box>
    )
}

export default PlayersList
