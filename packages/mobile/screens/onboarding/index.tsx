import * as React from 'react'
import { Routes } from '../routes';
import { FlatList, Dimensions, SafeAreaView } from 'react-native';
import slides from './slides';
import Slide from './Slide'
import Footer from './Footer';
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const Onboarding = ({ navigation }) => {
    const ref = React.useRef();
    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };

    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;

        if (nextSlideIndex != slides.length) {
            const offset = nextSlideIndex * width;
            ref?.current.scrollToOffset({offset});
            setCurrentSlideIndex(currentSlideIndex + 1);
        } else {
            navigation.navigate(Routes.Presentation)
        }
    };

    const skip = () => {
        const lastSlideIndex = slides.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current.scrollToOffset({offset});
        setCurrentSlideIndex(lastSlideIndex);
    };

    return (
        <SafeAreaView>
            <FlatList
                ref={ref}
                data={slides}
                onMomentumScrollEnd={updateCurrentSlideIndex}
                renderItem={({ item, index }) => {
                    return (
                        <Slide
                            {...item}
                            skip={skip}
                            next={goToNextSlide}
                        />
                    )
                }}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            <Footer current={currentSlideIndex} />
        </SafeAreaView>
    );
}

export default Onboarding
