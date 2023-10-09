import * as React from 'react'
import { FlatList, SafeAreaView } from 'react-native';
import slides from './slides';
import Slide from './Slide'

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
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

export default Onboarding
