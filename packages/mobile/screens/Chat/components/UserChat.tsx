import * as React from 'react'
import { getChats } from '@approbado/lib/services/chat.services'
import { Chat } from '@approbado/lib/types/models'
import { ScrollView } from 'react-native';
import ChatCard from './ChatCard';
import EmptyChat from './EmptyChat';

const UserChat = ({ route, navigation }) => {
    const chat = route.params.chat;

    return (
        <ScrollView>

        </ScrollView>
    );
}

export default UserChat
