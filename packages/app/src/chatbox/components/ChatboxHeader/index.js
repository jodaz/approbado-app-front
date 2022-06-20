import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box';
import { useChatState } from '@approbado/lib/hooks/useChat'
import Skeleton from '@material-ui/lab/Skeleton';
import makeStyles from '@material-ui/styles/makeStyles'
import configs from '@approbado/lib/configs';
import BookmarkInput from './BookmarkInput'
import SearchInput from './SearchInput'
import ChatMenu from '../../../layouts/Chat/aside/components/ChatMenu'

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
        width: '100%',
        height: '4rem',
        alignItems: 'center',
        padding: '0 1rem',
        boxShadow: '0px 1px 0px rgba(0, 0, 0, 0.24)'
    },
    names: {
        fontWeight: 700,
        lineHeight: '24px',
        fontSize: '18px'
    },
    container: {
        flexGrow: '1'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexGrow: 0.1,
        height: 'inherit',
        alignItems: 'center'
    }
}))

const ChatboxHeader = () => {
    const { isChatSelected, current } = useChatState();
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Box sx={{ marginRight: '1rem' }}>
                {!isChatSelected ? (
                    <Skeleton
                        animation="wave"
                        variant="circle"
                        width={40}
                        height={40}
                    />
                ) : (
                    <Box className={classes.names}>
                        <Avatar src={`${configs.SOURCE}/${current.participants[0].picture}`} />
                    </Box>
                )}
            </Box>
            <Box className={classes.container}>
                {!isChatSelected ? (
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    />
                ) : (
                    <Box className={classes.names}>
                        {current.is_private
                            ? current.participants[0]['names']
                            : current.name
                        }
                    </Box>
                )}
            </Box>
            <Box className={classes.buttons}>
                <SearchInput />
                <BookmarkInput />
                {isChatSelected && <ChatMenu  chat={current} />}
            </Box>
        </Box>
    );
}

export default ChatboxHeader
