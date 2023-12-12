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

const Pressable = styled.Pressable`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: ${props => props.theme.space[2]};
    margin-top: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[1]};
    width: 100%;
`

const MessageCountContainer = styled.View`
    background-color: ${props => props.theme.palette.info.main};
    padding: ${props => props.theme.space[1]};
    border-radius: 50px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-right: ${props => props.theme.space[1]}
`

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
    const chatName = !item.is_private
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
                        color="secondary"
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
                    <MessageCountContainer>
                        {/* <MessageText>
                            6
                        </MessageText> */}
                    </MessageCountContainer>
                    <Text fontSize={16} fontWeight={400}>
                        {datetime}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ChatCard;
