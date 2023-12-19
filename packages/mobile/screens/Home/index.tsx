import * as React from 'react'
import { Button, Container, Row } from '../../components';
import { Routes } from '../routes';
import { Mail } from 'lucide-react-native';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import QuickTrivia from './components/QuickTrivia';

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
        </Container>
    );
}

export default Home
