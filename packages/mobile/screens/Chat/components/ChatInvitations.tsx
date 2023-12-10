import * as React from 'react'
import { getChats } from '@approbado/lib/services/chat.services'
import { Chat } from '@approbado/lib/types/models'
import { ScrollView } from 'react-native';
import EmptyChat from './EmptyChat';
import ChatInvitation from './ChatInvitation';

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
            {chats.map((chat: Chat) => <ChatInvitation item={chat} />)}
        </ScrollView>
    );
}

export default ChatInvitations
