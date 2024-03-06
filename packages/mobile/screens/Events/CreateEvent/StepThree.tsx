import * as React from 'react'
import {
    Row,
    Button,
    ScrollViewContainer,
    TextInput,
    Checkbox
} from '../../../components';
import { Routes } from '../../routes';
import { useForm } from 'react-hook-form';
import { Video } from 'lucide-react-native';
import { format } from 'date-fns';
import { createSchedule } from '@approbado/lib/services/schedules.services'

const StepThree = ({ navigation, route }) => {
    const { control, handleSubmit, watch } = useForm();
    const reminder = watch('notify_before')

    const onSubmit = async (values) => {
        console.log(JSON.stringify(route.params.data, null, ' '))
        const paramsData = route.params.data;

        const { starts_at, time, ...restData } = paramsData

        const startsAt = format(new Date(starts_at), 'dd-MM-yyyy')
        const timeFormat = format(new Date(time), 'HH:mm')

        const formData = {
            starts_at: `${startsAt} ${timeFormat}`,
            notify_before:  reminder ? true : false,
            ...restData,
            ...values
        }

        const { success, data } = await createSchedule(formData);

        if (success) {
            navigation.navigate(Routes.CreateEventSuccess)
        } else {
            console.log(data)
        }
    }

    return (
        <ScrollViewContainer>
            <Row>
                <TextInput
                    label='Videollamada'
                    control={control}
                    name='link'
                    placeholder='Ingresar link'
                    icon={<Video />}
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
        </ScrollViewContainer>
    );
}

export default StepThree
