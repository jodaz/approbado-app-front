import * as React from 'react';
import Confirm from '@approbado/lib/layouts/Confirm';
import { useDialogState, useDialogDispatch } from "@approbado/lib/hooks/useDialog"
import { Form } from 'react-final-form'
import InputContainer from '@approbado/lib/components/InputContainer'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TextInput from '@approbado/lib/components/TextInput'
import { useHistory } from 'react-router-dom'
import SelectCategoriesInput from './SelectCategoriesInput';
import SelectTriviaInput from './SelectTriviaInput'
import validateForum from './validate';
import { createForum } from '@approbado/lib/services/forums.services'

const ForumCreate = () => {
    const { status } = useDialogState('forums.create');
    const { unsetDialog } = useDialogDispatch('forums.create')
    const { showNotification } = useUiDispatch();
    const history = useHistory()

    const save = async (values) => {
        const { success, status, data } = await createForum(values);

        if (success) {
            history.push(`/forums/${data.id}`);
            unsetDialog();
            await showNotification('¡Ha realizado una publicación!');
        } else {
            if (status == 422) {
                return data;
                // setFormErrors(setError, data)
            } else {
                console.log(data)
                // await openToast(
                //     dispatch,
                //     'error',
                //     'Ha ocurrido un error.'
                // )
            }
        }
    };

    return (
        <Form
            onSubmit={save}
            validate={validateForum}
            render={ ({ handleSubmit, submitting }) => (
                <Confirm
                    isOpen={status}
                    title="Crear nuevo debate"
                    content={
                        <Box maxWidth="90em">
                            <Grid container spacing={1}>
                                <InputContainer label='Título' md={12}>
                                    <TextInput
                                        name="message"
                                        placeholder="Ingrese un título"
                                        fullWidth
                                    />
                                </InputContainer>
                                <InputContainer label='Descripción' md={12}>
                                    <TextInput
                                        name="summary"
                                        placeholder="Ingrese una descripción (Opcional)"
                                        fullWidth
                                        multiline
                                        minRows={3}
                                    />
                                </InputContainer>
                                <SelectCategoriesInput disabled={submitting} />
                                <SelectTriviaInput disabled={submitting} />
                            </Grid>
                        </Box>
                    }
                    onConfirm={async () => {
                        await handleSubmit();
                    }}
                    onClose={unsetDialog}
                    confirmColor='primary'
                    confirm={'Publicar'}
                />
            )}
        />
    );
}

export default ForumCreate;
