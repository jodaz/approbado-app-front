import * as React from 'react'
import {
    Container,
    Text
} from '../../components';
import NoNotifications from './components/NoNotifications';
import TitleBar from '../../components/TitleBar';
import { View } from 'react-native';

const Notifications = ({ navigation }) => {

    return (
        <Container>
            <TitleBar>
                <Text fontSize={18} fontWeight={600}>
                    Notificaciones
                </Text>
            </TitleBar>
            <View style={{
                height: 300
            }}>
                <NoNotifications />
            </View>
        </Container>
    );
}

export default Notifications
