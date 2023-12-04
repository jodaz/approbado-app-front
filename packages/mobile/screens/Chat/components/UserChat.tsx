import * as React from 'react'
import { Container } from '../../../components';
import { Chat } from '@approbado/lib/types/models'
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';
import MessagesList from './MessagesList';

const UserChat = ({ route, navigation }) => {
    const chat = route.params.chat;

    return (
        <Container>
            <ChatHeader user={chat.participants[0]} />
            <MessagesList chat={chat} />
            <ChatForm chat_id={chat.id} />
        </Container>
    );
}

export default UserChat
