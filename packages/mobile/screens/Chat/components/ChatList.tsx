import * as React from 'react'
import { getChats } from '@approbado/lib/services/chat.services'
import { Chat } from '@approbado/lib/types/models'
import { useAuth } from '@approbado/lib/contexts/AuthContext'
import { ScrollView } from 'react-native';
import ChatCard from './ChatCard';
import EmptyChat from './EmptyChat';

const ChatList = () => {
    const { state: { user } } = useAuth();
    const [chats, setChats] = React.useState<Chat[] | []>([]);

    const fetchChats = React.useCallback(async () => {
        const { success, data } = await getChats({
            filter: { status: 'accepted' }
        })

        if (success) {
            setChats(data);
        }
    }, []);

    React.useEffect(() => {
        fetchChats();
    }, [])

    if (!chats.length) {
        return (
            <EmptyChat
                title={'Aún no tienes mensajes'}
                subtitle='Invita a una persona para iniciar una conversación'
            />
        )
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            {chats.map((chat: Chat) => (
                <ChatCard
                    item={chat}
                    user_id={user?.id}
                />
            ))}
        </ScrollView>
    );
}

export default ChatList
