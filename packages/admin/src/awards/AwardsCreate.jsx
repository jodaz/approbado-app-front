import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { createAward } from '@approbado/lib/services/awards.services'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import validate from './validateAwardForm'
import { FileInput, ACCESS_TYPES } from './awardsFormHelpers'
import TextInput from '@approbado/lib/components/TextInput'
import SelectInput from '@approbado/lib/components/SelectInput'

const AwardsCreate = () => {
    const { trivia_id } = useParams()
    const { showNotification } = useUiDispatch();
    const history = useHistory()

    const save = React.useCallback(async ({ file, ...restValues }) => {
        const response = await createAward({
            trivia_id: trivia_id,
            file: file.rawFile, ...restValues
        });

        if (response.success) {
            history.push(`/trivias/${trivia_id}/awards`)
            showNotification(`¡Ha registrado el premio "${restValues.title}" exitosamente!`)
        } else {
            return response.data;
        }
    }, [trivia_id])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear premio'
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

export default AwardsCreate
