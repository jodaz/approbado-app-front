import * as React from 'react'
import {
    FlatList,
    Dimensions
} from 'react-native';
import TabIndicator from './TabIndicator';
import profileSliders from './profileSliders';
import Certificates from './Certificates';

const { width } = Dimensions.get('window');

const ProfileTabView = ({ user }) => {
    const ref = React.useRef();
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const onSelectIndicator = (value: number) => {
        const offset = (width - 40);
        ref?.current.scrollToOffset({offset});
        console.log(offset)
        setCurrentSlideIndex(value);
    }

    return (
        <>
            <TabIndicator
                onTouch={onSelectIndicator}
                current={currentSlideIndex}
            />
            <FlatList
                ref={ref}
                data={profileSliders}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                renderItem={({ item, index }) => (<item.component user={user} />)}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
            />
            {currentSlideIndex == 0 && <Certificates />}
        </>
    );
}

export default ProfileTabView
