import * as React from 'react'
import Box from '@material-ui/core/Box'
import { useChatState } from '@approbado/lib/hooks/useChat'
import AcceptMessageDialog from './AcceptMessageDialog'
import MessageCard from './MessageCard'
import { useUserState } from '@approbado/lib/hooks/useUserState'

const Chatbox = () => {
    const { current } = useChatState();
    const { user } = useUserState();

    const { messages, notification } = current;

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}>
            <Box sx={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem',
                height: '100px'
            }}>
                {messages && messages.map((message, i) => (
                    <MessageCard {...message} index={i} currUserId={user.id} />
                ))}
            </Box>
            {notification && <AcceptMessageDialog {...current} currUserId={user.id} />}
        </Box>
    );
}

export default Chatbox;
