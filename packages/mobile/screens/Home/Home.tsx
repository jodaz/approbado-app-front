import * as React from 'react'
import { Row } from '../../components';
import { ScrollView } from 'react-native';
import QuickTrivia from './components/QuickTrivia';
import RecentTrivias from './components/RecentTrivias';

const HomeScreen = () => {
    return (
        <ScrollView contentContainerStyle={{
            paddingHorizontal: 20
        }} >
            <Row size={1}>
                <QuickTrivia />
            </Row>
        </ScrollView>
    );
}

export default HomeScreen
