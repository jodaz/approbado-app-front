import * as React from 'react'
import { Button, Container, Row, TriviaCard } from '../../components';
import { Routes } from '../routes';
import { Mail } from 'lucide-react-native';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import QuickTrivia from './components/QuickTrivia';
import RecentTrivias from './components/RecentTrivias';

const Home = ({ navigation }) => {

    return (
        <Container>
            <Row size={1} align='center' direction='row' justify='space-between'>
                <Logotipo />
                <Button variant='text' onPress={() => navigation.navigate(Routes.Chat)}>
                    <Mail size={24} color='#000' />
                </Button>
            </Row>
            <Row size={1}>
                <QuickTrivia />
            </Row>
            <Row size={1}>
                <RecentTrivias />
            </Row>
        </Container>
    );
}

export default Home
