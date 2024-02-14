import * as React from 'react'
import { Button, Row } from '../../../components';
import { Routes } from '../../routes';
import { Bell, Calendar, Mail } from 'lucide-react-native';
import { horizontalScale } from '../../../styles/scaling';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import styled from 'styled-components';

const IconButton = styled(Button)`
    padding-horizontal: ${horizontalScale(10)}px;
    margin: 0;
`

const HomeHeader = () => {
    const navigation = useNavigation();

    return (
        <Row size={1} align='center' direction='row' style={{
            paddingHorizontal: horizontalScale(10)
        }}>
            <View style={{
                flex: 1
            }}>
                <Logotipo />
            </View>
            <IconButton variant='text' onPress={() => navigation.navigate(Routes.Chat)}>
                <Mail size={24} color='#000' />
            </IconButton>
            <IconButton variant='text' onPress={() => navigation.navigate(Routes.Events)}>
                <Calendar size={24} color='#000' />
            </IconButton>
            <IconButton variant='text' onPress={() => navigation.navigate(Routes.Notifications)}>
                <Bell size={24} color='#000' />
            </IconButton>
        </Row>
    )
}

export default HomeHeader
