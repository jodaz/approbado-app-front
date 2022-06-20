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

const useStyles = makeStyles(theme => ({
    root: {
        height: '4rem',
        cursor: 'pointer',
        display: 'flex',
        padding: '0 1rem',
        alignItems: 'center',
        backgroundColor: props =>
            props.isSelected ? `${alpha('#8AAEE4', 0.24)}`
            : theme.palette.background.default,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
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

const UserMessageCard = ({ rootRef, index, data }) => {
    const loading = data == null;
    const history = useHistory();
    const { data: selectedChat, status } = useChatState();
    const { setChat } = useChatDispatch();
    const [selected, setSelected] = React.useState(false);
    const classes = useStyles({
        isSelected: selected
    });

    const fetchChat = React.useCallback(async () => {
        try {
            const res = await axios.get(`/chats/${data.id}`)

            setChat(res.data);
        } catch (error) {
            console.log(error)
        }
    }, [data])

    const handleClick = () => {
        history.push(`/chats/${data.id}`)
        fetchChat()
    }

    React.useEffect(() => {
        if (status && !loading) {
            console.log(loading, data)
            if (selectedChat.id == data.id) {
                setSelected(true)
            }
        }
    }, [status, selectedChat, loading])

    return (
        <Box
            onClick={handleClick}
            className={classes.root}
            ref={rootRef}
            index={index}
        >
            <Box sx={{ marginRight: '1rem' }}>
                {loading ? (
                    <Skeleton
                        animation="wave"
                        variant="circle"
                        width={40}
                        height={40}
                    />
                ) : (
                    <Box className={classes.names}>
                        <Avatar src={`${configs.SOURCE}/${data.participants[0].picture}`} />
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
                            ? data.participants[0]['names']
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
        </Box>
    );
}

export default UserMessageCard
