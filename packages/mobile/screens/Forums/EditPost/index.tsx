import * as React from 'react'
import {
    Container,
    Row,
    TextInput,
    Text,
    SelectInput,
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
    const { control, handleSubmit, formState } = useForm({
        defaultValues: {
            title: post.message,
            summary: post.summary,
            trivias_ids: post.trivias.map(({ id }) => id),
            categories_ids: post.categories.map(({ id }) => id)
        }
    });
    const { dispatch } = useToast()
    const [themes, setThemes] = React.useState(null);
    const [categories, setCategories] = React.useState(null);
    console.log(JSON.stringify(post, null, 2));

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
                <Button variant='text' onPress={() => navigation.navigate(Routes.Forum)}>
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
            {/* <Row size={1}>
                {categories ? (
                    <SelectInput
                        label='Categoría'
                        name='categories_ids'
                        control={control}
                        placeholder='Seleccione una categoría'
                        options={categories}
                        labelField='name'
                        valueField='id'
                    />
                ) : null}
            </Row>
            <Row size={1}>
                {themes ? (
                    <SelectInput
                        label='Trivia'
                        name='trivias_ids'
                        control={control}
                        placeholder='Seleccione un tema'
                        options={themes}
                        labelField='name'
                        valueField='id'
                    />
                ) : null}
            </Row> */}
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
