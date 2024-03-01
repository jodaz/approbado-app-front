import * as React from 'react'
import {
    Row,
    Button,
    ScrollViewContainer
} from '../../components';
import { Routes } from '../routes';
import NoEvents from './components/NoEvents';
import { View } from 'react-native';

const ListEvents = ({ navigation }) => {
    return (
        <ScrollViewContainer>
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
        </ScrollViewContainer>
    );
}

export default ListEvents
