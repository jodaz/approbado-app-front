import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import validate from './validateAwardForm'
import Spinner from '@approbado/lib/components/Spinner'
import { FileInput, ACCESS_TYPES } from './awardsFormHelpers'
import { useHistory, useParams } from 'react-router-dom'
import TextInput from '@approbado/lib/components/TextInput'
import SelectInput from '@approbado/lib/components/SelectInput'
import { getAward, editAward } from '@approbado/lib/services/awards.services'

const AwardsEdit = () => {
    const { award_id, trivia_id } = useParams();
    const [record, setRecord] = React.useState(null)
    const history = useHistory();
    const { showNotification } = useUiDispatch();

    const fetchAward = async () => {
        const response = await getAward(award_id)

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

        const response = await editAward(award_id, data)

        if (response.success) {
            history.push(`/trivias/${trivia_id}/awards`)
            showNotification(`¡Ha actualizado el premio "${restValues.title}" exitosamente!`)
        } else {
            return response.data;
        }
    }, [trivia_id, award_id])

    React.useEffect(() => {
        if (award_id) {
            fetchAward()
        }
    }, [award_id])

    if (!record) return null;

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Editar premio'
            record={record}
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name="title"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Ingresa los puntos'>
                <TextInput
                    type='number'
                    name="min_points"
                    placeholder="Ingresa los puntos"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Tipo de premio'>
                <SelectInput
                    name="type"
                    options={ACCESS_TYPES}
                    fullWidth
                />
            </InputContainer>
            <FileInput />
        </BaseForm>
    )
}

export default AwardsEdit
