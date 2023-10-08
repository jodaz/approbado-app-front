import * as React from 'react'
import { FlatList, Dimensions, SafeAreaView } from 'react-native';
import slides from './slides';
import Slide from './Slide'

const { height } = Dimensions.get('window');

const Onboarding = () => {
    const ref = React.useRef();

    return (
        <SafeAreaView>
            <FlatList
                ref={ref}
                data={slides}
                renderItem={({ item, index }) => <Slide {...item} />}
                pagingEnabled
                horizontal
                contentContainerStyle={{ height: height * 0.75 }}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

export default Onboarding
