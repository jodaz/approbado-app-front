import * as React from 'react'
import { useForm } from 'react-hook-form';
import {
    Button,
    Row,
    TextInput,
    MultiSelectInput,
    ScrollViewContainer
} from '../../components';
import { TITLE } from '@approbado/lib/utils/validations'
import { createForum } from '@approbado/lib/services/forums.services'
import { Routes } from '../routes';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { listCategories } from '@approbado/lib/services/categories.services'

import setFormErrors from '@approbado/lib/utils/setFormErrors'

const CreatePost = ({ navigation }) => {
    const { control, handleSubmit, setError, formState } = useForm();
    const { dispatch } = useToast()
    const [themes, setThemes] = React.useState(null);
    const [categories, setCategories] = React.useState(null);

    const onSubmit = async values => {
        const { success, status, data } = await createForum(values);

        if (success) {
            await openToast(
                dispatch,
                'success',
                '¡Publicación realizada!'
            )
            navigation.navigate(Routes.ListPosts)
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
        <ScrollViewContainer>
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
            </Row>
            <Row size={1}>
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
        </ScrollViewContainer>
    );
}

export default CreatePost
