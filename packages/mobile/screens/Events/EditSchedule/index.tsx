import * as React from 'react'
import { Button, Checkbox, Container, LoadingScreen, Row, SelectInput, Text, TextInput, TitleBar } from '../../../components';
import { getSchedule, editSchedule } from '@approbado/lib/services/schedules.services'
import { Video } from 'lucide-react-native';
import { useForm } from 'react-hook-form';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { Routes } from '../../routes';
import { ScrollView } from 'react-native';
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
            trivia_id: data.trivia_id,
            subtheme_id: data.subtheme_id,
            level_id: data.level_id,
            users_ids: data.participants.map(({ id }) => id),
            notify_before: data.notify_before
        }
    })
    console.log(JSON.stringify(data, null, ' '))
    const onSubmit = async ({ trivia_id, users_ids, subtheme_id, level_id, ...rest }) => {
        const formData = {
            starts_at: new Date(),
            trivia_id: trivia_id,
            users_ids: users_ids,
            subtheme_id: subtheme_id,
            level_id: level_id,
            ...rest
        }

        console.log(JSON.stringify(formData, null, ' '))

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

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Row>
                <TextInput
                    control={control}
                    label='Título'
                    name='title'
                />
            </Row>
            <SelectParticipantsInput control={control} />
            <SelectTriviaInput control={control} />
            <SelectLevelInput control={control} />
            <SelectThemeInput control={control} />
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
                    disabled={formState.isSubmitting || !formState.isDirty}
                >
                    Guardar cambios
                </Button>
            </Row>
        </ScrollView>
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
        <Container>
            <Row>
                <TitleBar>
                    <Text>
                        Editar evento
                    </Text>
                </TitleBar>
            </Row>
            <EditScheduleLayout navigation={navigation} data={data} />
        </Container>
    )
}

export default EditSchedule
