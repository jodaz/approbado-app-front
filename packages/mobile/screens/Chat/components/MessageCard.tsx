import * as React from 'react'
import { Image, Text } from '../../../components';
import { Message } from '@approbado/lib/types/models'
import format from 'date-fns/format';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';

interface MessageCard {
    next: Message;
    message: Message;
    last: Message;
    userID: number;
    isPrivate: boolean;
}

interface IMessageRootProps {
    sender: boolean | null;
    first?: boolean | null;
}

const MessageRootContainer: React.FC<IMessageRootProps> = styled.View`
    flex-direction: column;
    align-items: ${props => props.sender ? 'flex-end' : 'flex-start'};
    align-self: ${props => props.sender ? 'flex-end' : 'flex-start'};
    margin-right: ${props => props.sender ? '10px' : '0'};
    margin-left: ${props => (!props.sender && !props.first) ? '60px' : '0'};
`

const GeneralMessage: React.FC<any> = styled.View`
    position: relative;
    padding: 20px;
    width: fit-content;
    margin-bottom: ${props => verticalScale(props.theme.space[1])}px;
    border-radius: 8px;
    font-weight: 400;
    flex-direction: row;
    gap: 10px;
`

const ReceptorMessage = styled(GeneralMessage)`
    background-color: #FFF;
    align-self: flex-start;
    border-top-left-radius: 0;
    flex-direction: column;
    align-items: start;
    color: #fff;
    width: 100%;
`

const SenderMessage: React.FC<any> = styled(GeneralMessage)`
    border-top-right-radius: 0;
    position: relative;
    max-width: 50%;
    background-color: ${props => props.theme.palette.primary.light}
`

const MessageCard: React.FC<MessageCard> = ({ last, message, next, userID, isPrivate }) => {
    const messageTime = format(new Date(message.created_at), 'h:mm a');

    if (userID != message.user_id) {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                width: '70%',
            }}>
                {last?.user_id !== message.user_id ? (
                    <Image source={message?.user?.picture} style={{
                        marginLeft: horizontalScale(10),
                        borderRadius: scaleFontSize(50)
                    }}/>
                ) : null}
                <MessageRootContainer key={message.id} first={last?.user_id !== message.user_id}>
                    <ReceptorMessage>
                        {(last?.user_id !== message.user_id && isPrivate) ? (
                            <Text fontSize={16} fontWeight={800} align='left' color="primary">
                                @{message?.user?.user_name}
                            </Text>
                        ) : null}
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
            </View>
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
