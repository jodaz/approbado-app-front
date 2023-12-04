import * as React from 'react'
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import MessagesList from './MessagesList';

const UserChat = ({ route, navigation }) => {
    const chat = route.params.chat;

    return (
        <>
            <ChatHeader user={chat.participants[0]} />
            <MessagesList chat={chat} />
            <ChatForm chat_id={chat.id} />
        </>
    );
}

export default UserChat
