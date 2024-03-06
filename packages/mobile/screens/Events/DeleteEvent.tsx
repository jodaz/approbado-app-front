import * as React from 'react'
import {
    Button,
    Row,
    Text,
    ScrollViewContainer
} from '../../components';
import Quiz from '@approbado/lib/illustrations/Quiz.svg'
import { deleteSchedule } from '@approbado/lib/services/schedules.services'
import { Routes } from '../routes';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';

const DeleteEvent = ({ navigation, route }) => {
    const { dispatch } = useToast();

    const handleDelete = async () => {
        const { success } = await deleteSchedule(route.params.item.id);

        if (success) {
            navigation.navigate(Routes.Events);
            await openToast(
                dispatch,
                'success',
                '¡Evento eliminado!'
            )
        } else {
            await openToast(
                dispatch,
                'error',
                'Ha ocurrido un error.'
            )
        }
    }

    return (
        <ScrollViewContainer>
            <Row justify='center' align='center' style={{
                width: '100%',
            }} size={6}>
                <Quiz />
            </Row>
            <Row>
                <Text align='center' fontSize={24} fontWeight={700}>
                    ¿Quieres eliminar la trivia?
                </Text>
            </Row>
            <Row>
                <Text align='center'>
                Si eliminas la trivia, afectará a todos los involucrados ¿Quieres continuar?
                </Text>
            </Row>
            <Row>
                <Button
                    variant='outlined'
                    onPress={() => navigation.navigate(Routes.Events)}
                >
                    Cancelar
                </Button>
            </Row>
            <Row>
                <Button
                    onPress={handleDelete}
                    variant='contained'
                >
                    Continuar
                </Button>
            </Row>
        </ScrollViewContainer>
    );
}

export default DeleteEvent
