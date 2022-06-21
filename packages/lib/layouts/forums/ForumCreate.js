import * as React from 'react';
import Confirm from '@approbado/lib/layouts/Confirm';
import { useDialogState, useDialogDispatch } from "@approbado/lib/hooks/useDialogStatus"
import { Form } from 'react-final-form'
import InputContainer from '@approbado/lib/components/InputContainer'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { useUserDispatch } from '@approbado/lib/hooks/useUserState'
import TextInput from '@approbado/lib/components/TextInput'
import { useHistory } from 'react-router-dom'
import SelectCategoriesInput from './SelectCategoriesInput';
import SelectTriviaInput from './SelectTriviaInput'
import { axios } from '@approbado/lib/providers'

const ForumCreate = () => {
    const status = useDialogState('forums.create');
    const { unsetDialog } = useDialogDispatch('forums.create')
    const { fetchUser } = useUserDispatch();
    const { showNotification } = useUiDispatch();
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/forums', values)

            if (data) {
                await showNotification('¡Ha realizado una publicación!');
                history.push(`/forums/${data.id}`);
                unsetDialog();
                fetchUser();
            }
        } catch (error) {
            console.log(error)
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, []);

    return (
        <Form
            onSubmit={save}
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
                                    />
                                </InputContainer>
                                <SelectTriviaInput />
                                <SelectCategoriesInput submitting={submitting} />
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
