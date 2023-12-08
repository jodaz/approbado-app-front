import React from 'react';
import { Chat } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import { Image, Text, Row } from '../../../components';
import format from 'date-fns/format';
import truncateString from '@approbado/lib/utils/truncateString'
import styled from 'styled-components/native';
import { View } from 'react-native';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { es } from 'date-fns/locale'

const Pressable = styled.Pressable`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: ${props => props.theme.space[2]};
    margin-top: ${props => props.theme.space[1]};
    margin-bottom: ${props => props.theme.space[1]};
    width: 100%;
`

const ChatCard = ({ item } : Chat ) : JSX.Element => {
    const navigation = useNavigation();
    const lastMessage = item.messages.length
        ? item.messages[0]
        : null;
    const [datetime, setDatetime] = React.useState(null)

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
                        {item.participants[1].user_name}
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
                <Text fontSize={16} fontWeight={400}>
                    {datetime}
                </Text>
            </View>
        </Pressable>
    )
}

export default ChatCard;
