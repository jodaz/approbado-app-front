import * as React from 'react'
import { useForm } from 'react-hook-form';
import Container from '../../components/Container';
import { Text, Button, Row } from '../../components';
import { Routes } from '../routes';
import { Mail } from 'lucide-react-native';
import Logotipo from '@approbado/lib/illustrations/Logotipo.svg'
import BottomDrawer from '../../components/BottomDrawer';

const Home = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    return (
        <Container>
            <Row size={2} align='center' direction='row' justify='space-between'>
                <Logotipo />
                <Button variant='text' onPress={() => navigation.navigate(Routes.Chat)}>
                    <Mail size={24} color='#000' />
                </Button>
            </Row>
        </Container>
    );
}

export default Home
