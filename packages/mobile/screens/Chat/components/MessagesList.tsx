import * as React from 'react'
import { Container } from '../../../components';
import socketIOClient from 'socket.io-client'
import { Chat } from '@approbado/lib/types/models'
import { getSingleChat } from '@approbado/lib/services/chat.services'
import { useAuth } from '@approbado/lib/contexts/AuthContext'
import MessageCard from './MessageCard';
import CONFIG_NAMES from '@approbado/lib/env'

interface IMessagesListProps {
    chat: Chat;
}

const socket = socketIOClient(CONFIG_NAMES.SOURCE)

const MessagesList = ({ chat } : IMessagesListProps ) => {
    const [messages, setMessages] = React.useState<any>(chat.messages);
    const { state: { user } } = useAuth()

    const fetchMessages = React.useCallback(async () => {
        const { success, data } = await getSingleChat(chat.id)

        if (success) {
            const { messages: arrMessages } = data;

            setMessages(arrMessages);
        }
    }, [chat.id]);

    const getNextMessage = (index: number) => {
        if (messages.length > index) return messages[index];

        return null;
    }

    React.useEffect(() => {
        socket.on("new_message", () => fetchMessages());

        return () => socket.disconnect();
    }, [])

    if (!messages) {
        return null;
    }

    return (
        <Container>
            {messages.map((message: any, index:number) => (
                <MessageCard
                    next={getNextMessage(index + 1)}
                    message={message}
                    userID={user.id}
                />
            ))}
        </Container>
    );
}

export default MessagesList
