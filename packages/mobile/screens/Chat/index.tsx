import * as React from 'react'
import { ArrowLeft } from 'lucide-react-native';
import { Row, Container, Text, Button } from '../../components';
import Messages from '@approbado/lib/illustrations/Messages.svg'

const Chat = ({ navigation }) => {
    return (
        <Container>
            <Row align='center' direction='row' justify='start' size={2}>
                <ArrowLeft
                    size={24}
                    color='#000'
                    onPress={() => navigation.goBack()}
                />
                <Text>
                    Tus mensajes
                </Text>
            </Row>
            <Row size={1} justify='center' align='center'>
                <Messages />
            </Row>
            <Row size={1} justify='center' align='center'>
                <Text color="secondary" fontSize={20} fontWeight={600}>
                    Aún no tienes mensajes
                </Text>
            </Row>
            <Row size={1} justify='center' align='center'>
                <Text align='center' color="secondary" fontSize={16} fontWeight={400}>
                    Selecciona a una persona para iniciar una conversación
                </Text>
            </Row>
        </Container>
    );
}

export default Chat
