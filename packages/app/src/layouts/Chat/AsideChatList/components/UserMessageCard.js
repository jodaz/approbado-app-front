import * as React from 'react'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box';
import Dot from '@approbado/lib/components/Dot'
import Skeleton from "@material-ui/lab/Skeleton";
import configs from '@approbado/lib/configs'
import { useHistory } from 'react-router-dom'
import { useChatDispatch, useChatState } from '@approbado/lib/hooks/useChat';
import { axios } from '@approbado/lib/providers'
import { makeStyles, alpha } from '@material-ui/core'
import ChatMenu from './ChatMenu';

const useStyles = makeStyles(theme => ({
    root: {
        height: '4rem',
        cursor: 'pointer',
        display: 'flex',
        padding: '0 0.5rem',
        borderRadius: '6px',
        alignItems: 'center',
        transition: '0.1s',
        margin: '0.6rem 0.4rem',
        backgroundColor: props =>
            props.isSelected ? `${alpha('#8AAEE4', 0.24)}`
            : theme.palette.background.default,
        '&:hover': {
            backgroundColor: '#EAEAEA'
        }
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '75%'
    },
    names: {
        fontWeight: 700,
        color: theme.palette.primary.dark
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        fontWeight: 300,
        color: theme.palette.info.light,
        fontSize: '0.85rem'
    }
}));

const UserMessageCard = ({
    rootRef,
    data,
    index
}) => {
    const loading = data == null;
    const history = useHistory();
    const { selected } = useChatState();
    const isThisSelected = data != null ? selected == data.id : null
    const { setChat, setChatID } = useChatDispatch();
    const [visible, setVisible] = React.useState(false);
    const anchorRef = React.useRef(null)
    const classes = useStyles({
        isSelected: isThisSelected
    });

    const fetchChat = async (id) => {
        try {
            const res = await axios.get(`/chats/${id}`)

            if (res.status >= 200 || res.status < 300) {
                setChat(res.data);
                history.push(`/chats/${data.id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = async (e) => {
        if (!isThisSelected && anchorRef.current && anchorRef.current.contains(e.target)) {
            console.log("IS HERE")
            setChatID(data.id)
            await fetchChat(data.id)
        }
        e.preventDefault();
    };

    return (
        <Box
            ref={rootRef}
            key={index}
            onClick={handleClick}
            component='div'
        >
            <Box
                className={classes.root}
                onMouseEnter={() => setVisible(true)}
                onMouseLeave={() => setVisible(false)}
                ref={anchorRef}
            >
                <Box sx={{ width: '10%', paddingRight: '1rem' }}>
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            variant="circle"
                            width={40}
                            height={40}
                        />
                    ) : (
                        <Box className={classes.names}>
                            <Avatar src={`${configs.SOURCE}/${data.participants[1].picture}`} />
                        </Box>
                    )}
                </Box>
                <Box className={classes.container}>
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="80%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (
                        <Box className={classes.names}>
                            {data.is_private
                                ? data.participants[1]['names']
                                : data.name
                            }
                        </Box>
                    )}
                    {loading ? (
                        <Skeleton
                            animation="wave"
                            height={10}
                            width="40%"
                            style={{ marginBottom: 6 }}
                        />
                    ) : (
                        <Box className={classes.message}>
                            Último mensaje
                            <Dot />
                            12 minutos
                        </Box>
                    )}
                </Box>
                <Box>
                    {(visible) && <ChatMenu chat={data} />}
                </Box>
            </Box>
        </Box>
    );
}

export default UserMessageCard
