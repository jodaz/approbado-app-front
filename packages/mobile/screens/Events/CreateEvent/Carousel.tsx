import * as React from 'react'
import { ScrollView } from 'react-native';
import { verticalScale } from '../../../styles/scaling';
import CarouselIndicator from './CarouselIndicator';

const TabsCarousel = ({ state, descriptors, navigation, position }) => (
    <ScrollView
        style={{
            flexDirection: 'row',
            maxHeight: verticalScale(30),
            height: verticalScale(30)
        }}
        contentContainerStyle={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'center'
        }}
        scrollEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
    >
        {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const inputRange = state.routes.map((_, i) => i);
            const opacity = position.interpolate({
                inputRange,
                outputRange: inputRange.map(i => (i === index ? 1 : 0)),
            });

            return (
                <CarouselIndicator active={isFocused}>
                    {label}
                </CarouselIndicator>
            )
        })}
    </ScrollView>
);

export default TabsCarousel
