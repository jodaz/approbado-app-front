import * as React from 'react'
import {
    Button,
    Row,
    Container,
    Text
} from '../../components';
import Quiz from '@approbado/lib/illustrations/Quiz.svg'
import { Routes } from '../routes';

const CreateEventSuccess = ({ navigation }) => (
    <Container>
        <Row justify='center' align='center' style={{
            width: '100%',
            height: '30%'
        }}>
            <Quiz />
        </Row>
        <Row>
            <Text align='center' fontSize={24} fontWeight={700}>
                Acabas de crear una trivia
            </Text>
        </Row>
        <Row>
            <Text align='center'>
                Felicidades! Diviertete realizando las
                increíbles trivias que tenemos para ti
            </Text>
        </Row>
        <Row size={4}>
            <Button onPress={() => navigation.navigate(Routes.Events)}>
                Continuar
            </Button>
        </Row>
    </Container>
);

export default CreateEventSuccess
