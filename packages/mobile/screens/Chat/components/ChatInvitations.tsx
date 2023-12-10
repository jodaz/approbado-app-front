import * as React from 'react'
import { getChats } from '@approbado/lib/services/chat.services'
import { Chat } from '@approbado/lib/types/models'
import { ScrollView } from 'react-native';
import ChatCard from './ChatCard';
import EmptyChat from './EmptyChat';

const ChatInvitations = () => {
    const [chats, setChats] = React.useState<Chat[] | []>([]);

    const fetchChats = React.useCallback(async () => {
        const { success, data } = await getChats({
            filter: { status: 'pending' }
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
                title={'No tienes invitaciones'}
                subtitle='Invita a una persona para iniciar una conversación'
            />
        )
    }

    return (
        <ScrollView>
            {chats.map((chat: Chat) => <ChatCard item={chat} />)}
        </ScrollView>
    );
}

export default ChatInvitations
