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
import { Video } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { Routes } from '../../routes';
import SelectTriviaInput from '../components/SelectTriviaInput';
import SelectLevelInput from '../components/SelectLevelInput';
import SelectThemeInput from '../components/SelectThemeInput';
import SelectParticipantsInput from '../components/SelectParticipantsInput';
import setFormErrors from '@approbado/lib/utils/setFormErrors'

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

    const onSubmit = async ({ trivia_id, users_ids, subtheme_id, level_id, ...rest }) => {
        const formData = {
            starts_at: new Date(),
            trivia_id: trivia_id,
            users_ids: users_ids,
            subtheme_id: subtheme_id,
            level_id: level_id,
            ...rest
        }

        const { success, status, data: responseData } = await editSchedule(data.id, formData);

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
    console.log(JSON.stringify(data, null, ' '))
    return (
        <ScrollViewContainer>
            <Row>
                <TextInput
                    control={control}
                    label='Título'
                    name='title'
                />
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
                <Button variant='outlined' onPress={() => navigation.goBack()}>
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
