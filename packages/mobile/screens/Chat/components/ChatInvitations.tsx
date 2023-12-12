import * as React from 'react'
import { getChats } from '@approbado/lib/services/chat.services'
import { Chat } from '@approbado/lib/types/models'
import { ScrollView } from 'react-native';
import { useAuth } from '@approbado/lib/contexts/AuthContext'
import EmptyChat from './EmptyChat';
import ChatInvitation from './ChatInvitation';
import { useIsFocused } from '@react-navigation/native';

const ChatInvitations = () => {
    const isFocused = useIsFocused();
    const { state: { user } } = useAuth();
    const [chats, setChats] = React.useState<Chat[] | []>([]);

    const fetch = React.useCallback(async () => {
        const { success, data } = await getChats({
            filter: { status: 'pending' }
        })

        if (success) {
            setChats(data);
        }
    }, []);

    React.useEffect(() => {
        fetch();
    }, [isFocused])

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
            {chats.map((chat: Chat) => (
                <ChatInvitation
                    item={chat}
                    user_id={user?.id}
                />
            ))}
        </ScrollView>
    );
}

export default ChatInvitations
