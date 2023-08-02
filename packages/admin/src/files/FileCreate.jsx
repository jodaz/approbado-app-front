import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { fileProvider } from '@approbado/lib/providers'
import { useFileProvider } from '@jodaz_/file-provider'
import { useParams, useHistory } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import isEmpty from 'is-empty'
import UploadFileButton from '@approbado/lib/components/UploadFileButton'
import validate from './validateFileForm'
import TextInput from '@approbado/lib/components/TextInput'
import SelectSubthemeInput from './SelectSubthemeInput'

const FileCreate = () => {
    const { trivia_id } = useParams()
    const [provider, { data: fileDataResponse, loading }] = useFileProvider(fileProvider);
    const history = useHistory()
    const { showNotification } = useUiDispatch();

    const save = React.useCallback(async (values) => {
        const data = { trivia_id: trivia_id, ...values };

        try {
            await provider({
                resource: 'files',
                type: 'create',
                payload: data
            });
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [provider, trivia_id])

    React.useEffect(() => {
        if (!isEmpty(fileDataResponse)) {
            history.push(`/trivias/${trivia_id}/files`)
            showNotification(`¡Ha registrado el archivo "${fileDataResponse.title}" exitosamente!`)
        }
    }, [fileDataResponse])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear archivo'
            loading={loading}
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name="title"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <SelectSubthemeInput />
            <InputContainer label="" xs={12} md={12}>
                <UploadFileButton
                    name="file"
                    accept='application/pdf'
                />
            </InputContainer>
        </BaseForm>
    )
}

export default FileCreate
