import * as React from 'react'
import Box from '@material-ui/core/Box'
import ChatboxHeader from './components/ChatboxHeader'
import ChatboxInput from './components/ChatboxInput'
import ChatboxMessages from './components/ChatboxMessages'
import { useParams } from 'react-router-dom'
import { useChatState, useChatDispatch } from '@approbado/lib/hooks/useChat'
import { axios } from '@approbado/lib/providers'

const Chatbox = () => {
    const { chat_id } = useParams();
    const { isChatSelected } = useChatState();
    const { setChat, setChatID } = useChatDispatch();

    const fetchChat = React.useCallback(async () => {
        try {
            const res = await axios.get(`/chats/${chat_id}`)

            setChat(res.data);
            setChatID(res.data.id)
        } catch (error) {
            console.log(error)
        }
    }, [chat_id])

    React.useState(() => {
        if (!isChatSelected) {
            fetchChat();
        }
    }, [isChatSelected, chat_id])

    return (
        <Box sx={{
            display: 'flex',
            width: 'inherit',
            flexDirection: 'column'
        }}>
            <ChatboxHeader />
            <ChatboxMessages />
            <ChatboxInput />
        </Box>
    );
}

export default Chatbox;
