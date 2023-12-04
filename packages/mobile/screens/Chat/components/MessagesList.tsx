import * as React from 'react'
import { Container } from '../../../components';
import { Chat } from '@approbado/lib/types/models'
import { getSingleChat } from '@approbado/lib/services/chat.services'
import { useAuth } from '@approbado/lib/contexts/AuthContext'
import MessageCard from './MessageCard';

interface IMessagesListProps {
    chat: Chat;
}

const MessagesList = ({ chat } : IMessagesListProps ) => {
    const [messages, setMessages] = React.useState<any>(null);
    const { state: { user } } = useAuth()

    const fetchMessages = React.useCallback(async () => {
        const { success, data } = await getSingleChat(chat.id)

        if (success) {
            const { messages: arrMessages } = data;

            setMessages(arrMessages);
        }
    }, [chat.id]);

    React.useEffect(() => { fetchMessages() }, [])

    if (!messages) {
        return null;
    }

    return (
        <Container>
            {messages.map((message: any, index:number) => (
                <MessageCard
                    message={message}
                    isReceptor={message.user_id == user.id}
                />
            ))}
        </Container>
    );
}

export default MessagesList
