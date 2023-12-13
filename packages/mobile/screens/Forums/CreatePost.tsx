import * as React from 'react'
import { useForm } from 'react-hook-form';
import {
    SelectInput,
    Button,
    Row,
    Text,
    TextInput
} from '../../components';
import {
    Dimensions
} from 'react-native';
import { TITLE } from '@approbado/lib/utils/validations'
import { createForum } from '@approbado/lib/services/forums.services'
import { Routes } from '../routes';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { listCategories } from '@approbado/lib/services/categories.services'
import setFormErrors from '@approbado/lib/utils/setFormErrors'
import styled from 'styled-components/native';

const { width, height } = Dimensions.get('window');

const Container = styled.ScrollView`
    height: ${height}px;
    padding-top: ${(props) => props.theme.space[6]};
    width: ${width}px;
`

const InnerContainer = styled.ScrollView`
    width: ${width * .9}px;
    margin: 0 auto;
`

const CreatePost = ({ navigation }) => {
    const { control, handleSubmit, setError, formState } = useForm();
    const { dispatch } = useToast()
    const [themes, setThemes] = React.useState(null);
    const [categories, setCategories] = React.useState(null);

    const onSubmit = async ({ trivias_ids, categories_ids, ...restValues }) => {
        const formData = {
            ...restValues,
            trivias_ids: [trivias_ids],
            categories_ids: [categories_ids]
        }

        const { success, status, data } = await createForum(formData);

        if (success) {
            await openToast(
                dispatch,
                'success',
                '¡Publicación realizada!'
            )
            navigation.navigate(Routes.Forum)
        } else {
            if (status == 422) {
                setFormErrors(setError, data)
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
            <InnerContainer>
                <Row align='center' direction='row' justify='space-between' size={2}>
                    <Text>
                        Crear nuevo debate
                    </Text>
                    <Button variant='text' onPress={() => navigation.navigate(Routes.Forum)}>
                        Cancelar
                    </Button>
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
                <Row size={1}>
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
                <Row size={2}>
                    <Button
                        isLoading={formState.isSubmitting}
                        fullWidth
                        onPress={handleSubmit(onSubmit)}
                    >
                        Publicar
                    </Button>
                </Row>
            </InnerContainer>
        </Container>
    );
}

export default CreatePost
