import * as React from 'react'
import { getFile, editFile } from '@approbado/lib/services/files.services'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { useParams, useHistory } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import UploadFileButton from '@approbado/lib/components/UploadFileButton'
import validate from './validateFileForm'
import SelectSubthemeInput from './SelectSubthemeInput'
import TextInput from '@approbado/lib/components/TextInput'

const FileEdit = () => {
    const { file_id, trivia_id } = useParams();
    const [record, setRecord] = React.useState({})
    const history = useHistory();
    const { showNotification } = useUiDispatch();

    const fetchFile = async () => {
        const response = await getFile(file_id)

        if (response.success) {
            setRecord(response.data)
        } else {
            console.log(response.data)
        }
    }

    const save = React.useCallback(async ({ file, ...restValues }) => {
        const data = {
            trivia_id: trivia_id,
            file: file.rawFile,
            ...restValues
        };

        const response = await editFile(file_id, data)

        if (response.success) {
            history.push(`/trivias/${trivia_id}/files`)
            showNotification(`¡Ha actualizado el archivo "${restValues.title}" exitosamente!`)
        } else {
            return response.data;
        }
    }, [trivia_id, file_id])

    React.useEffect(() => {
        if (file_id) {
            fetchFile()
        }
    }, [file_id])

    if (!record) return null;

    return (
        <BaseForm
            save={save}
            validate={validate}
            record={record}
            saveButtonLabel='Actualizar'
            formName='Editar archivo'
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
                    source='file'
                    accept='application/pdf'
                />
            </InputContainer>
        </BaseForm>
    )
}

FileEdit.defaultProps = {
    basePath: '/files',
    resource: 'files'
}

export default FileEdit
