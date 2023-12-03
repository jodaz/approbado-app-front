import * as React from 'react'
import { Container } from '../../../components';
import { Chat } from '@approbado/lib/types/models'
import ChatHeader from './ChatHeader';
import ChatForm from './ChatForm';

const UserChat = ({ route, navigation }) => {
    const chat = route.params.chat;

    return (
        <Container>
            <ChatHeader user={chat.participants[0]} />
            <ChatForm chat_id={chat.id} />
        </Container>
    );
}

export default UserChat
