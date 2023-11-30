import * as React from 'react'
import { View } from 'react-native';
import TabIndicator from './TabIndicator';

const Tabs = ({ state, descriptors, navigation, position }) => (
    <View style={{ flexDirection: 'row' }}>
        {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
            const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
            }
            };

            const onLongPress = () => {
                navigation.emit({
                    type: 'tabLongPress',
                    target: route.key,
                });
            };

            const inputRange = state.routes.map((_, i) => i);
            const opacity = position.interpolate({
                inputRange,
                outputRange: inputRange.map(i => (i === index ? 1 : 0)),
            });

            return (
                <TabIndicator
                    active={isFocused}
                    onLongPress={onLongPress}
                    onPress={onPress}
                >
                    {label}
                </TabIndicator>
            )
        })}
    </View>
);

export default Tabs
