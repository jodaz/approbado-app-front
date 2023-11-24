import * as React from 'react'
import { useForm } from 'react-hook-form';
import { Button, Row, Text, TextInput } from '../../components';
import { TITLE } from '@approbado/lib/utils/validations'
import { createForum } from '@approbado/lib/services/forums.services'
import { Routes } from '../routes';
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import setFormErrors from '@approbado/lib/utils/setFormErrors'
import Container from '../../components/Container';

const CreateForum = ({ navigation }) => {
    const { control, handleSubmit, setError, formState } = useForm();
    const { dispatch } = useToast()

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

    return (
        <Container>
            <Row align='center' justify='space-between' size={2}>
                <Text>
                    Crear nuevo debate
                </Text>
                <Button variant='text' onPress={() => navigation.navigate(Routes.Forum)}>
                    Cancelar
                </Button>
            </Row>
            <Row size={1}>
                <TextInput
                    label='Título'
                    name='title'
                    control={control}
                    validations={TITLE}
                />
            </Row>
            <Row size={1}>
                <TextInput
                    label='Descripción'
                    name='description'
                    control={control}
                    validations={TITLE}
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
