import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        padding: '0.5rem 1rem',
        maxWidth: '50%',
        width: 'fit-content',
        marginBottom: '2px',
        borderRadius: '8px',
        fontWeight: 400,
        gap: '10px'
    },
    received: {
        backgroundColor: theme.palette.info.main,
        alignSelf: 'start',
        borderBottomLeftRadius: 0,
        color: '#fff'
    },
    sent: {
        backgroundColor: '#ECEEF1',
        borderBottomRightRadius: 0,
        alignSelf: 'end'
    }
}))

const MessageCard = ({ id, message, user_id, currUserId, ...rest }) => {
    const classes = useStyles();

    return (
        <Box key={id} className={clsx(classes.root, {
            [classes.received]: currUserId != user_id,
            [classes.sent]: currUserId == user_id
        })}>
            {message}
        </Box>
    )
}

export default MessageCard;
