import * as React from 'react'
import { Row, Text } from '../../../components';
import Messages from '@approbado/lib/illustrations/Messages.svg'

const EmptyChat = () => (
    <>
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
                Invita a una persona para iniciar una conversación
            </Text>
        </Row>
    </>
);

export default EmptyChat
