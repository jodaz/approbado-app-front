import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { uploadQuestionsFile } from '@approbado/lib/services/questions.services'
import { useParams, useHistory } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import UploadFileButton from '@approbado/lib/components/UploadFileButton'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Link from '@material-ui/core/Link'
import configs from '@approbado/lib/env'

const validate = (values) => {
    const errors = {};

    if (!values.file) {
        errors.file = "Ingrese un archivo.";
    }

    return errors;
};

const QuestionsUpload = () => {
    const [loading, setLoading] = React.useState(false)
    const { trivia_id, subtheme_id } = useParams()
    const history = useHistory()
    const { showNotification } = useUiDispatch();

    const save = React.useCallback(async ({ file }) => {
        setLoading(true)
        const data = { trivia_id: trivia_id, subtheme_id: subtheme_id, file: file.rawFile };

        const response = await uploadQuestionsFile(data);

        if (response.success) {
            setLoading(false)
            showNotification('¡Ha subido nuevas preguntas a la trivia!')
            history.push(`/trivias/${trivia_id}/subthemes/${subtheme_id}/questions`)
        } else {
            setLoading(false)
            return response.data;
        }
    }, [trivia_id, subtheme_id])

    return (
        <BaseForm
            save={save}
            validate={validate}
            loading={loading}
            unresponsive
        >
            <Box marginBottom="1rem">
                <Typography variant="h5" component="div" gutterBottom paragraph>
                    Subir de forma masiva
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    Descarga el archivo con el formato en excel y súbelo con los datos que deseas ingresar a la plataforma.
                </Typography>
                <Link
                    href={`${configs.SOURCE}/public/default/Preguntas_FORMATO.xlsx`}
                    underline="always"
                    color="info"
                >
                    Descargar formato
                </Link>
            </Box>
            <InputContainer label="" xs={12} md={12}>
                <UploadFileButton
                    name="file"
                    accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                    loading={loading}
                />
            </InputContainer>
        </BaseForm>
    )
}

export default QuestionsUpload
