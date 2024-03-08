import * as React from 'react'
import {
    Row,
    Button,
    TextInput,
    ScrollViewContainer
} from '../../../components';
import { Routes } from '../../routes';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { Calendar, Clock } from 'lucide-react-native';
import { REQUIRED_FIELD } from '@approbado/lib/utils/validations'
import DateTimePicker from '../../../components/DateTimePicker';

const StepOne = ({ navigation, ...restProps }) => {
    const { control, handleSubmit, formState } = useForm();

    const onSubmit = async values => {
        await navigation.navigate(Routes.CreateEventStepTwo, {
            data: values
        })
    }

    return (
        <ScrollViewContainer>
            <Row>
                <TextInput
                    label='Título de la reunión'
                    control={control}
                    name='title'
                    placeholder='Ingresar un título'
                    validations={REQUIRED_FIELD}
                />
            </Row>
            <Row direction='row'>
                <View style={{ flex: 1 }}>
                    <DateTimePicker
                        label='Día'
                        control={control}
                        mode='date'
                        name='starts_at'
                        icon={<Calendar />}
                    />
                </View>
                <View style={{ marginRight: 10 }} />
                <View style={{ flex: 1 }}>
                    <DateTimePicker
                        label='Hora'
                        control={control}
                        mode='time'
                        name='time'
                        icon={<Clock />}
                    />
                </View>
            </Row>
            <Row>
                <TextInput
                    control={control}
                    name='description'
                    placeholder='Añadir descripción'
                    multiline
                    numberOfLines={8}
                    editable
                    label='Descripción'
                />
            </Row>
            <Row>
                <Button
                    disabled={!formState?.isValid}
                    onPress={handleSubmit(onSubmit)}
                >
                    Añadir amigos
                </Button>
            </Row>
            <Row>
                <Button variant='outlined' onPress={() => navigation.goBack()}>
                    Descartar
                </Button>
            </Row>
        </ScrollViewContainer>
    );
}

export default StepOne
