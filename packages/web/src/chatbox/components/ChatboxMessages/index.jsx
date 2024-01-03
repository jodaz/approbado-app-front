import * as React from 'react'
import Box from '@material-ui/core/Box'
import MessageCard from './MessageCard'
import socketIOClient from "socket.io-client";
import CONFIG_NAMES from '@approbado/lib/env'
import { useParams } from 'react-router-dom'
import { apiProvider as axios } from '@approbado/lib/api'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import { useChatDispatch } from '@approbado/lib/hooks/useChat'

const Chatbox = ({ chat, loggedUser }) => {
    const { messages } = chat;
    const { chat_id } = useParams();
    const { setChat, setChatID } = useChatDispatch();
    const { user } = useUserState();

    const fetchChat = async (data) => {
        try {
            const { participants } = data;
            if (participants.find(({ id }) => id == user.id)) {
                const res = await axios.get(`/chats/${chat_id}`)
                setChat(res.data);
                setChatID(res.data.id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        const socket = socketIOClient(CONFIG_NAMES.SOURCE);

        socket.on("new_message", data => fetchChat(data));

        return () => socket.disconnect();
    }, [])

    return (
        <Box sx={{
            overflow: 'auto',
            flex: '1 1 0%',
            scrollbarWidth: 10,
            scrollbarColor: '#6D6D6D',
            "&::-webkit-scrollbar": {
                width: 10
            },
            "&::-webkit-scrollbar-track": {
                backgroundColor: "#D9D9D9",
                borderRadius: 5
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#6D6D6D",
                borderRadius: 5
            }
        }}>
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
                height: '100px'
            }}>
                {messages && messages.map((message, i) => (
                    <MessageCard {...message} index={i} currUserId={loggedUser.id} />
                ))}
            </Box>
        </Box>
    );
}

export default Chatbox;
