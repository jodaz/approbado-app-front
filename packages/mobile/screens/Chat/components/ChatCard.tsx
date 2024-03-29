import React from 'react';
import { Chat, User } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import { Image, Text } from '../../../components';
import { View } from 'react-native';
import { es } from 'date-fns/locale'
import truncateString from '@approbado/lib/utils/truncateString'
import styled from 'styled-components/native';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import socketIOClient from 'socket.io-client'
import CONFIG_NAMES from '@approbado/lib/env'
import { horizontalScale, scaleFontSize, verticalScale } from '../../../styles/scaling';

const Pressable = styled.Pressable`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    margin-vertical: ${props => verticalScale(props.theme.space[1])}px;
    width: 100%;
`

const Notification = styled.View`
    display: ${props => props.isHidden ? 'none' : 'flex'};
    background-color: ${props => props.theme.palette.info.main};
    padding-horizontal: ${props => horizontalScale(props.theme.space[1])}px;
    padding-vertical: ${props => verticalScale(props.theme.space[1])}px;
    border-radius: ${scaleFontSize(50)}px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-right: ${props => horizontalScale(props.theme.space[1])}px
`
const socket = socketIOClient(CONFIG_NAMES.SOURCE)

// const MessageText = styled.Text`
//     color: #fff;
//     font-weight: 800;
//     height: fit-content;
//     width: fit-content;
// `

interface IChatCardProps {
    item: Chat,
    user_id: number
}

const ChatCard = ({ item, user_id } : IChatCardProps ) : JSX.Element => {
    const navigation = useNavigation();
    const lastMessage = item.messages.length
        ? item.messages[0]
        : null;
    const [datetime, setDatetime] = React.useState(null)
    const [newMessage, setNewMessage] = React.useState(false)
    const chatName = item.is_private
        ? item.participants.find(({ id } : User) => id !== user_id).user_name
        : item.name;

    const handleNavigate = () => navigation.navigate(Routes.UserChat, {
        chat: item
    })

    const getDistanceInWords = () => formatDistanceToNowStrict(new Date(lastMessage?.created_at), {
        locale: es,
    }).slice(0, 12)

    React.useEffect(() => {
        if (lastMessage?.created_at) {
            setDatetime(getDistanceInWords())

            const interval = setInterval(() => {
                setDatetime(getDistanceInWords())
            }, 5000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [])

    React.useEffect(() => {
        socket.on("new_message", data => {
            if (data.chat_id == item.id) {
                setNewMessage(true);
            }
        });

        return () => {
            socket.off('new_message')
        }
    }, [])

    return (
        <Pressable onPress={handleNavigate} key={item.id}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Image source={item.participants[1].picture} />
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text fontSize={18}>
                        {chatName}
                    </Text>
                    <Text
                        fontSize={18}
                        color="text"
                        fontWeight={400}
                    >
                        {lastMessage
                            ? truncateString(lastMessage.message, 20)
                            : null
                        }
                    </Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    {/* <Notification>
                        <MessageText>
                            6
                        </MessageText>
                    </Notification> */}

                    <Notification isHidden={!newMessage} />
                    <Text fontSize={16} fontWeight={400}>
                        {datetime}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ChatCard;
