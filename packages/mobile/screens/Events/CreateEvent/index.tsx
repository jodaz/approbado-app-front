import * as React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import slides from './slides';
import TabsCarousel from './Carousel';
import { Routes } from '../../routes';

const CreateEvent = () => {
    const Tab = createMaterialTopTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName={Routes.CreateEventStepOne}
            tabBar={TabsCarousel}
            screenOptions={{
                swipeEnabled: false
            }}
        >
            {slides.map(screen => <Tab.Screen {...screen} />)}
        </Tab.Navigator>
    );
}

export default CreateEvent
