import {
    Box,
    makeStyles,
    useMediaQuery
} from '@material-ui/core';
import { useChatState } from '@approbado/lib/hooks/useChat'
import BookmarkInput from './BookmarkInput'
import SearchInput from './SearchInput'
import ChatMenu from '../../../layouts/Chat/AsideChatList/components/ChatMenu'
import Avatar from '@approbado/lib/components/Avatar';

const useStyles = makeStyles(() => ({
    root: {
        display: 'flex',
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
    const { selected, current } = useChatState();
    const classes = useStyles();
    const isSmall = useMediaQuery(theme =>
        theme.breakpoints.down('sm')
    )
                    {/* <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{ marginBottom: 6 }}
                    /> */}

    return (
        <Box className={classes.root}>
            <Box sx={{ marginRight: '1rem' }}>
                {!selected ? (
                    <></>
                ) : (
                    <Box className={classes.names}>
                        <Avatar alt='user_picture' source={current.participants[0].picture} />
                    </Box>
                )}
            </Box>
            <Box className={classes.container}>
                {!selected ? (
                    <></>
                ) : (
                    <Box className={classes.names}>
                        {current.is_private
                            ? current.participants[0].names
                            : current.name
                        }
                    </Box>
                )}
            </Box>
            <Box className={classes.buttons}>
                {!isSmall && (
                    <>
                        <SearchInput />
                        <BookmarkInput />
                    </>
                )}
                {selected && <ChatMenu chat={current} />}
            </Box>
        </Box>
    );
}

export default ChatboxHeader
