import * as React from 'react'
import { Row, ScrollViewContainer } from '../../components';
import QuickTrivia from './components/QuickTrivia';
import RecentTrivias from './components/RecentTrivias';
import PopularTrivias from './components/PopularTrivias';

const HomeScreen = () => {
    return (
        <ScrollViewContainer>
            <Row size={1}>
                <QuickTrivia />
            </Row>
            <Row size={1}>
                <RecentTrivias />
            </Row>
            <Row size={1}>
                <PopularTrivias />
            </Row>
        </ScrollViewContainer>
    );
}

export default HomeScreen
