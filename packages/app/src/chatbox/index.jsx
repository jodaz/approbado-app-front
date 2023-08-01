import * as React from 'react'
import Box from '@material-ui/core/Box'
import ChatboxHeader from './components/ChatboxHeader'
import ChatboxInput from './components/ChatboxInput'
import ChatboxMessages from './components/ChatboxMessages'
import { useParams } from 'react-router-dom'
import { useChatState, useChatDispatch } from '@approbado/lib/hooks/useChat'
import { useUserState } from '@approbado/lib/hooks/useUserState'
import { apiProvider as axios } from '@approbado/lib/api'
import AcceptMessageDialog from './AcceptMessageDialog'

const Chatbox = () => {
    const { chat_id } = useParams();
    const { isChatSelected, current } = useChatState();
    const { setChat, setChatID } = useChatDispatch();
    const { user } = useUserState();

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
            <ChatboxMessages
                chat={current}
                loggedUser={user}
            />
            {(current.chatStatus == 'accepted') &&  <ChatboxInput />}
            {(current.chatStatus == 'pending') && (
                <AcceptMessageDialog
                    {...current}
                    currUserId={user.id}
                />
            )}
            {(current.chatStatus == 'rejected' || current.chatStatus == 'leaved') && (
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    padding: '2rem',
                    height: '5%',
                    textAlign: 'center',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    color: '#6D6D6D'
                }}>
                    {(current.chatStatus == 'rejected') ? <>Haz rechazado esta solicitud de mensajes.</> : <>Has abandonado este grupo.</>}
                </Box>
            )}
        </Box>
    );
}

export default Chatbox;
