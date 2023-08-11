import * as React from 'react'
import { createFile } from '@approbado/lib/services/files.services'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { useParams, useHistory } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import UploadFileButton from '@approbado/lib/components/UploadFileButton'
import validate from './validateFileForm'
import TextInput from '@approbado/lib/components/TextInput'
import SelectSubthemeInput from './SelectSubthemeInput'

const FileCreate = () => {
    const { trivia_id } = useParams()
    const history = useHistory()
    const { showNotification } = useUiDispatch();

    const save = React.useCallback(async ({ file, ...restValues }) => {
        const response = await createFile({
            trivia_id: trivia_id,
            file: file.rawFile,
            ...restValues
        });

        if (response.success) {
            history.push(`/trivias/${trivia_id}/files`)
            showNotification(`¡Ha registrado el archivo "${restValues.title}" exitosamente!`)
        } else {
            return response.data;
        }
    }, [trivia_id])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear archivo'
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
