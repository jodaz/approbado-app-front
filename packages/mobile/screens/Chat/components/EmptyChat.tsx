import * as React from 'react'
import { Row, Text } from '../../../components';
import Messages from '@approbado/lib/illustrations/Messages.svg'

interface IEmptyChatProps {
    title: string;
    subtitle: string;
}

const EmptyChat = ({ title, subtitle } : IEmptyChatProps) => (
    <>
        <Row size={4} justify='center' align='center'>
            <Messages />
        </Row>
        <Row size={1} justify='center' align='center'>
            <Text color="secondary" fontSize={20} fontWeight={600}>
                {title}
            </Text>
        </Row>
        <Row size={1} justify='center' align='center'>
            <Text align='center' color="secondary" fontSize={16} fontWeight={400}>
                {subtitle}
            </Text>
        </Row>
    </>
);

export default EmptyChat
