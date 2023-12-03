import React from 'react';
import { Chat } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native';
import { Routes } from '../../routes';
import { Image, Text, Row } from '../../../components';
import truncateString from '@approbado/lib/utils/truncateString'
import styled from 'styled-components/native';

const Pressable = styled.Pressable`
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
`

const ChatCard = ({ item } : Chat ) : JSX.Element => {
    const navigation = useNavigation();

    const handleNavigate = () => navigation.navigate(Routes.UserChat, {
        chat: item
    })

    return (
        <Pressable onPress={handleNavigate} key={item.id}>
            <Row size={3} direction='row' align='start'>
                <Image source={item.participants[1].picture} />
                <Row size={2}>
                    <Text fontSize={18}>
                        {item.participants[1].user_name}
                    </Text>
                    <Text
                        fontSize={18}
                        color="secondary"
                        fontWeight={400}
                    >
                        {truncateString('hola askaj fkjafj akakf', 20)}
                    </Text>
                </Row>
            </Row>
        </Pressable>
    )
}

export default ChatCard;
