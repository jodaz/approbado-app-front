import * as React from 'react'
import {
    Row,
    Button,
    Container,
    Text,
    TextInput,
    Checkbox
} from '../../../components';
import { Routes } from '../../routes';
import { ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import TitleBar from '../../../components/TitleBar';
import { horizontalScale, verticalScale } from '../../../styles/scaling';

const StepThree = ({ navigation }) => {
    const { control, handleSubmit, formState, watch } = useForm();
    const reminder = watch('reminder')

    const onSubmit = async (values) => {
        console.log(values)
        // navigation.navigate(Routes.CreateEventSuccess)
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Row>
                <TextInput
                    label='Videollamada'
                    control={control}
                    name='link'
                    placeholder='Ingresar link'
                />
            </Row>
            <Row>
                <Checkbox
                    control={control}
                    label='Enviar recordatorio de 30 minutos antes de la reunión'
                    name='notify_before'
                />
            </Row>
            <Row>
                <Button onPress={handleSubmit(onSubmit)}>
                    Guardar trivia
                </Button>
            </Row>
            <Row>
                <Button
                    variant='outlined'
                    onPress={() => navigation.navigate(Routes.CreateEventStepTwo)}
                >
                    Regresar
                </Button>
            </Row>
        </ScrollView>
    );
}

export default StepThree
