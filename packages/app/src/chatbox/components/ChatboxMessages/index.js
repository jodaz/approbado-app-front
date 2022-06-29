import * as React from 'react'
import Box from '@material-ui/core/Box'
import MessageCard from './MessageCard'

const Chatbox = ({ chat, loggedUser }) => {
    const { messages } = chat;

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
                    <MessageCard {...message} index={i} currUserId={loggedUser.id} />
                ))}
            </Box>
        </Box>
    );
}

export default Chatbox;
