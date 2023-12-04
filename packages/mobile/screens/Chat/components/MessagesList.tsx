import * as React from 'react'
import { Container } from '../../../components';
import socketIOClient from 'socket.io-client'
import { Chat } from '@approbado/lib/types/models'
import { getSingleChat } from '@approbado/lib/services/chat.services'
import { useAuth } from '@approbado/lib/contexts/AuthContext'
import MessageCard from './MessageCard';
import CONFIG_NAMES from '@approbado/lib/env'
import { FlatList, View } from 'react-native';

interface IMessagesListProps {
    chat: Chat;
}

const socket = socketIOClient(CONFIG_NAMES.SOURCE)

const MessagesList = ({ chat } : IMessagesListProps ) => {
    const [messages, setMessages] = React.useState<any>(chat.messages);
    const { state: { user } } = useAuth()
    const flatListRef = React.useRef(null);

    const scrollToBottom = () => {
        flatListRef.current.scrollToEnd({ animated: true });
    };

    const fetchMessages = async () => {
        const { success, data } = await getSingleChat(chat.id)

        if (success) {
            const { messages: arrMessages } = data;

            setMessages(arrMessages);
            scrollToBottom()
        }
    };

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
        <View style={{ flex: 1, width: '100%' }}>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={({ item, index }) => (
                    <MessageCard
                        next={getNextMessage(index + 1)}
                        message={item}
                        userID={user.id}
                    />
                )}
            />
        </View>
    );
}

export default MessagesList
