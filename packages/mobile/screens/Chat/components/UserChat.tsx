import * as React from 'react'
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import MessagesList from './MessagesList';
import { useAuth } from '@approbado/lib/contexts/AuthContext'

const UserChat = ({ route }) => {
    const { state: { user } } = useAuth();
    const chat = route.params.chat;
    const chatName = chat.is_private
        ? chat.participants.find(({ id } : User) => id !== user.id).user_name
        : chat.name;

    return (
        <>
            <ChatHeader name={chatName} />
            <MessagesList chat={chat} />
            <ChatForm chat_id={chat.id} />
        </>
    );
}

export default UserChat
