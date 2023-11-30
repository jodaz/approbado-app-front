import * as React from 'react'
import { ArrowLeft, PenSquare } from 'lucide-react-native';
import { Row, Container, Text } from '../../components';
import EmptyChat from './components/EmptyChat';
import { Routes } from '../routes';

const Chat = ({ navigation }) => {
    return (
        <Container>
            <Row align='center' direction='row' justify='space-between' size={2}>
                <ArrowLeft
                    size={24}
                    color='#000'
                    onPress={() => navigation.goBack()}
                />
                <Text>
                    Tus mensajes
                </Text>
                <PenSquare
                    size={24}
                    color='#000'
                    onPress={() => navigation.navigate(Routes.InviteChat)}
                />
            </Row>
            <EmptyChat />
        </Container>
    );
}

export default Chat
