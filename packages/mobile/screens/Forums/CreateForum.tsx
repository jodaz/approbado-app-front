import * as React from 'react'
import { useForm } from 'react-hook-form';
import { Button, Row, Text, TextInput } from '../../components';
import { TITLE } from '@approbado/lib/utils/validations'
import { createForum } from '@approbado/lib/services/forums.services'
import { Routes } from '../routes';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { listCategories } from '@approbado/lib/services/categories.services'
import setFormErrors from '@approbado/lib/utils/setFormErrors'
import Container from '../../components/Container';
import SelectInput from '../../components/SelectInput';

const CreateForum = ({ navigation }) => {
    const { control, handleSubmit, setError, formState } = useForm();
    const { dispatch } = useToast()
    const [themes, setThemes] = React.useState(null);
    const [categories, setCategories] = React.useState(null);

    const onSubmit = async (values) => {
        const { success, status, data } = await createForum(values);

        if (success) {
            await openToast(
                dispatch,
                'success',
                '¡Publicación realizada!'
            )
            navigation.navigate(Routes.CompleteProfile, values)
        } else {
            if (status == 422) {
                setFormErrors(setError, data)
            }
        }
    };

    const fetchThemes = React.useCallback(async () => {
        const { success, data } = await listTrivias()

        if (success) {
            setThemes(data);
        }
    }, []);

    const fetchCategories = React.useCallback(async () => {
        const { success, data } = await listCategories()

        if (success) {
            setCategories(data);
        }
    }, []);

    React.useEffect(() => {
        fetchThemes();
        fetchCategories();
    }, [])

    return (
        <Container>
            <Row align='center' direction='row' justify='space-between' size={2}>
                <Text>
                    Crear nuevo debate
                </Text>
                <Button variant='text' onPress={() => navigation.navigate(Routes.Forum)}>
                    Cancelar
                </Button>
            </Row>
            <Row size={1}>
                <SelectInput
                    label='Trivia'
                    name='theme_id'
                    control={control}
                    validations={TITLE}
                    placeholder='Seleccione un tema'
                    options={themes}
                    labelField='name'
                    valueField='id'
                />
            </Row>
            <Row size={1}>
                <TextInput
                    label='Título'
                    name='title'
                    control={control}
                    validations={TITLE}
                    placeholder='Ingresa un título de foro'
                />
            </Row>
            <Row size={1}>
                <TextInput
                    label='Descripción'
                    name='description'
                    control={control}
                    placeholder='Ingresa una descripción (opcional)'
                    multiline
                />
            </Row>
            <Row size={2}>
                <Button
                    disabled={!formState.isValid || formState.isSubmitting}
                    isLoading={formState.isSubmitting}
                    fullWidth
                    onPress={handleSubmit(onSubmit)}
                >
                    Publicar
                </Button>
            </Row>
        </Container>
    );
}

export default CreateForum
