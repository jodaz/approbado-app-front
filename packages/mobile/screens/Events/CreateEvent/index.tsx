import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Container, Text, TitleBar } from '../../../components';
import slides from './slides';
import TabsCarousel from './Carousel';
import { Routes } from '../../routes';
import { ScrollView } from 'react-native';

const CreateEvent = ({ navigation }) => {
    const Tab = createMaterialTopTabNavigator();

    return (
        <ScrollView contentContainerStyle={{
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20
        }}>
            <Tab.Navigator
                initialRouteName={Routes.CreateEventStepOne}
                tabBar={TabsCarousel}
                screenOptions={{
                    swipeEnabled: false
                }}
            >
                {slides.map(screen => <Tab.Screen {...screen} />)}
            </Tab.Navigator>
        </ScrollView>
    );
}

export default CreateEvent
