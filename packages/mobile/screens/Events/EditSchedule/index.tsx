import * as React from 'react'
import {
    Button,
    Checkbox,
    LoadingScreen,
    Row,
    ScrollViewContainer,
    TextInput
} from '../../../components';
import { getSchedule, editSchedule } from '@approbado/lib/services/schedules.services'
import { Calendar, Clock, Video } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { Routes } from '../../routes';
import { format } from 'date-fns';
import { View } from 'react-native';
import SelectTriviaInput from '../components/SelectTriviaInput';
import SelectLevelInput from '../components/SelectLevelInput';
import SelectThemeInput from '../components/SelectThemeInput';
import SelectParticipantsInput from '../components/SelectParticipantsInput';
import setFormErrors from '@approbado/lib/utils/setFormErrors'
import DateTimePicker from '../../../components/DateTimePicker';

const EditScheduleLayout = ({ data, navigation }) => {
    const { dispatch } = useToast();
    const { control, handleSubmit, setError, formState } = useForm({
        defaultValues: {
            title: data.title,
            description: data.description,
            share_link: data.share_link,
            trivia_id: data.subtheme.trivia_id,
            subtheme_id: data.subtheme_id,
            level_id: data.level_id,
            users_ids: data.participants.map(({ id }) => id),
            notify_before: data.notify_before
        }
    })

    const onSubmit = async ({
        trivia_id,
        users_ids,
        subtheme_id,
        level_id,
        starts_at,
        time,
        ...rest
    }) => {
        const startsAt = format(new Date(starts_at), 'dd-MM-yyyy')
        const timeFormat = format(new Date(time), 'HH:mm')

        const formData = {
            starts_at: `${startsAt} ${timeFormat}`,
            trivia_id: trivia_id,
            users_ids: users_ids,
            subtheme_id: subtheme_id,
            level_id: level_id,
            ...rest
        }

        const {
            success,
            status, data: responseData
        } = await editSchedule(data.id, formData);

        if (success) {
            navigation.navigate(Routes.Events);
            await openToast(
                dispatch,
                'success',
                '¡Evento editado!'
            )
        } else {
            if (status == 422) {
                setFormErrors(setError, responseData)
            } else {
                await openToast(
                    dispatch,
                    'error',
                    'Ha ocurrido un error.'
                )
            }
        }
    }

    return (
        <ScrollViewContainer>
            <Row>
                <TextInput
                    control={control}
                    label='Título'
                    name='title'
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
            <SelectTriviaInput control={control} />
            <SelectThemeInput control={control} />
            <SelectLevelInput control={control} />
            <SelectParticipantsInput control={control} />
            <Row>
                <TextInput
                    control={control}
                    label='Videollamada'
                    name='share_link'
                    placeholder='Ingresar link'
                    icon={<Video />}
                />
            </Row>
            <Row>
                <TextInput
                    control={control}
                    label='Descripción'
                    name='description'
                    placeholder='Descripción del evento'
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
                <Button
                    variant='outlined'
                    onPress={() => navigation.goBack()}
                    disabled={formState.isSubmitting}
                >
                    Descartar
                </Button>
            </Row>
            <Row>
                <Button
                    onPress={handleSubmit(onSubmit)}
                    disabled={formState.isSubmitting || !formState?.isValid}
                >
                    Guardar cambios
                </Button>
            </Row>
        </ScrollViewContainer>
    )
}

const EditSchedule = ({ route, navigation }) => {
    const schedule = route.params.item
    const [data, setData] = React.useState(null)

    const fetchSchedules = React.useCallback(async () => {
        const { success, data } = await getSchedule(schedule.id)

        if (success) {
            setData(data);
        }
    }, []);

    React.useEffect(() => { fetchSchedules() }, [])

    if (!data) return <LoadingScreen />

    return (
        <EditScheduleLayout
            navigation={navigation}
            data={data}
        />
    )
}

export default EditSchedule
