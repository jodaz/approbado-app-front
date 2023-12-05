import React from 'react';
import { Chat } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import { Image, Text, Row } from '../../../components';
import format from 'date-fns/format';
import truncateString from '@approbado/lib/utils/truncateString'
import styled from 'styled-components/native';

const Pressable = styled.Pressable`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
    height: fit-content;
`

const ChatCard = ({ item } : Chat ) : JSX.Element => {
    const navigation = useNavigation();
    const messageTime = format(new Date(message.created_at), 'h:mm a');

    const handleNavigate = () => navigation.navigate(Routes.UserChat, {
        chat: item
    })

    return (
        <Pressable onPress={handleNavigate} key={item.id}>
            <Row size={3} direction='row' align='start'>
                <Image source={item.participants[1].picture} />

                <Text fontSize={18}>
                    {item.participants[1].user_name}
                </Text>
                <Row size={2} align='start'>
                    <Text
                        fontSize={18}
                        color="secondary"
                        fontWeight={400}
                    >
                        {item.messages?.length
                            ? truncateString(item.messages[0].message, 20)
                            : null
                        }
                    </Text>
                </Row>
            </Row>
        </Pressable>
    )
}

export default ChatCard;
