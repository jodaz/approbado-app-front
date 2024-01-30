import * as React from 'react'
import {
    Button,
    Container,
    Row,
    Text
} from '../../components';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import SelectTypeButton from './components/SelectTypeButton';

const SelectTrivia = props => {
    const { formState, control } = useForm();

    return (
        <Container>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Row size={1}>
                    <Text fontSize={24}>
                        ¡Genial! Estas a punto de iniciar una trivia
                    </Text>
                    <Text fontSize={22} fontWeight={600}>
                        Elige el nivel de dificultad
                    </Text>
                </Row>
                <Row size={1}>
                    <Text fontSize={20}>
                        Derecho laboral
                    </Text>
                </Row>
                <Row size={1}>
                    <Text fontSize={20} fontWeight={400}>
                        Tema:
                    </Text>
                </Row>
                <Row size={1}>
                    <Text fontSize={20}>
                        Seleccione un nivel
                    </Text>
                    <SelectTypeButton
                        control={control}
                        name='level'
                        options={[
                            'Básico', 'Intermedio', 'Avanzado'
                        ]}
                    />
                </Row>
                <Row size={1}>
                    <Text fontSize={20}>
                        Selecciona un tipo
                    </Text>
                    <SelectTypeButton
                        control={control}
                        name='type'
                        options={[
                            'Práctica', 'Reto'
                        ]}
                    />
                </Row>
                <Row size={1}>
                    <Text fontSize={17} fontWeight={400}>
                        * Este tipo de trivia es calificatoria.
                        Responderás las preguntas y al finalizar podrás visualizar tu calificación y las respuestas
                    </Text>
                </Row>
                <Row size={1}>
                    <Button disabled={!formState.isDirty}>
                        Comenzar
                    </Button>
                </Row>
            </ScrollView>
        </Container>
    )
};

export default SelectTrivia
