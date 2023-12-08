import * as React from 'react'
import {
    Container,
    Row,
    TextInput,
    Text,
    MultiSelectInput,
    Button
} from '../../../components';
import styled from 'styled-components/native';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { useForm } from 'react-hook-form';
import { TITLE } from '@approbado/lib/utils/validations'
import { editForum } from '@approbado/lib/services/forums.services'
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { listCategories } from '@approbado/lib/services/categories.services'

const EditPost = ({ route, navigation }) => {
    const post = route.params.post;
    const { control, handleSubmit, formState, watch } = useForm({
        defaultValues: {
            message: post.message,
            summary: post.summary,
            trivias_ids: post.trivias.map(({ id }) => id),
            categories_ids: post.categories.map(({ id }) => id)
        }
    });
    const { dispatch } = useToast()
    const [themes, setThemes] = React.useState(null);
    const [categories, setCategories] = React.useState(null);

    const onSubmit = async values => {
        const { success, status, data } = await editForum(post.id, values);

        if (success) {
            await openToast(
                dispatch,
                'success',
                '¡Publicación editada!'
            )
            navigation.goBack()
        } else {
            if (status == 422) {
                console.log(data)
            } else {
                console.log(data)
                await openToast(
                    dispatch,
                    'error',
                    'Ha ocurrido un error.'
                )
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
                    Editar debate
                </Text>
                <Button variant='text' onPress={() => navigation.goBack()}>
                    Cancelar
                </Button>
            </Row>
            <Row size={1}>
                <TextInput
                    label='Título'
                    name='message'
                    control={control}
                    placeholder='Ingresa un título de foro'
                    validations={TITLE}
                />
            </Row>
            <Row size={1}>
                <TextInput
                    label='Descripción'
                    name='summary'
                    control={control}
                    placeholder='Ingresa una descripción (opcional)'
                    multiline
                />
            </Row>
            {categories ? (
                <Row size={1}>
                    <MultiSelectInput
                        label='Categorías'
                        control={control}
                        name='categories_ids'
                        options={categories}
                        valueField='id'
                        labelField='name'
                    />
                </Row>
            ) : null}
            {themes ? (
                <Row size={1}>
                    <MultiSelectInput
                        label='Trivias'
                        control={control}
                        name='trivias_ids'
                        options={themes}
                        valueField='id'
                        labelField='name'
                    />
                </Row>
            ) : null}
            <Row size={2}>
                <Button
                    isLoading={formState.isSubmitting}
                    fullWidth
                    onPress={handleSubmit(onSubmit)}
                >
                    Editar
                </Button>
            </Row>
        </Container>
    );
}

export default EditPost
