import * as React from 'react'
import {
    Row,
    Button,
    Container,
    Text
} from '../../components';
import TitleBar from '../../components/TitleBar';
import { Routes } from '../routes';
import NoEvents from './components/NoEvents';
import { View } from 'react-native';

const Events = ({ navigation }) => {
    return (
        <Container>
            <TitleBar>
                <Text fontSize={18} fontWeight={600}>
                    Eventos
                </Text>
            </TitleBar>
            <View style={{
                height: 300
            }}>
                <NoEvents />
            </View>
            <Row>
                <Button onPress={() => navigation.navigate(Routes.CreateEvent)}>
                    Crear nuevo evento
                </Button>
            </Row>
        </Container>
    );
}

export default Events
