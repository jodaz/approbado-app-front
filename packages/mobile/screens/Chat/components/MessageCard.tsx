import * as React from 'react'
import { Image, Text } from '../../../components';
import format from 'date-fns/format';
import styled from 'styled-components/native';

interface MessageCard {
    next: any;
    message: any;
    userID: number;
}

const MessageRootContainer: React.FC<{sender?: boolean | null}> = styled.View`
    flex-direction: column;
    align-items: ${props => props.sender ? 'flex-end' : 'flex-start'};
    align-self: ${props => props.sender ? 'flex-end' : 'flex-start'};
    margin-right: ${props => props.sender ? '10px' : '0'};
    margin-left: ${props => !props.sender ? '10px' : '0'};
`

const GeneralMessage: React.FC<any> = styled.View`
    position: relative;
    padding: 20px;
    max-width: 50%;
    width: fit-content;
    margin-bottom: 2px;
    border-radius: 8px;
    font-weight: 400;
    gap: 10px;
`

const ReceptorMessage = styled(GeneralMessage)`
    background-color: #FFF;
    align-self: flex-start;
    border-top-left-radius: 0;
    color: #fff;
`

const SenderMessage: React.FC<any> = styled(GeneralMessage)`
    border-top-right-radius: 0;
    position: relative;
    background-color: ${props => props.theme.palette.primary.light}
`

const MessageCard: React.FC<MessageCard> = ({ message, next, userID }) => {
    const messageTime = format(new Date(message.created_at), 'h:mm a');

    if (userID != message.user_id) {
        return (
            <MessageRootContainer key={message.id}>
                {/* <Image source={message.user?.picture} /> */}
                <ReceptorMessage>
                    {message.message ? (
                        <Text fontWeight={400} align='left' color="primary">
                            {message.message}
                        </Text>
                    ) : null}

                    {message.file ? (
                        <Image source={message.file} />
                    ) : null}
                </ReceptorMessage>
                {next?.user_id != message.user_id ? (
                    <Text fontSize={14} fontWeight={400} align='left' color="primary">
                        {messageTime}
                    </Text>
                ) : null}
            </MessageRootContainer>
        );
    }

    return (
        <MessageRootContainer key={message.id} sender>
            <SenderMessage>
                {message.message ? (
                    <Text fontWeight={400} align='left' color="primary">
                        {message.message}
                    </Text>
                ) : null}

                {message.file ? (
                    <Image source={message.file} />
                ) : null}
            </SenderMessage>
            {next?.user_id != message.user_id ? (
                <Text fontSize={14} fontWeight={400} align='left' color="primary">
                    {messageTime}
                </Text>
            ) : null}
        </MessageRootContainer>
    );
}

export default MessageCard
