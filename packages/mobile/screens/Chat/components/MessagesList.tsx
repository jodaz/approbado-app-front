import * as React from 'react'
import { Chat } from '@approbado/lib/types/models'
import { getSingleChat } from '@approbado/lib/services/chat.services'
import { useAuth } from '@approbado/lib/contexts/AuthContext'
import MessageCard from './MessageCard';
import CONFIG_NAMES from '@approbado/lib/env'
import { FlatList, View } from 'react-native';
import socketIO from 'socket.io-client'

interface IMessagesListProps {
    chat: Chat;
}

const socket = socketIO.connect(CONFIG_NAMES.SOURCE)

const MessagesList = ({ chat } : IMessagesListProps ) => {
    const [messages, setMessages] = React.useState<any>([]);
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

    const getLastMessage = (index: number) => {
        if (index >= 0 && messages.length > index) return messages[index];

        return null;
    }

    React.useEffect(() => {
        if (!messages.length) {
            fetchMessages()
        }
        socket.on("new_message", () => fetchMessages());

        return () => {
            socket.off('new_message')
        }
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
                        last={getLastMessage(index - 1)}
                        message={item}
                        userID={user.id}
                        isPrivate={chat?.is_private}
                    />
                )}
            />
        </View>
    );
}

export default MessagesList
