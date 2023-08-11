import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { useHistory } from 'react-router-dom'
import TextInput from '@approbado/lib/components/TextInput'
import InputContainer from '@approbado/lib/components/InputContainer'
import BaseForm from '@approbado/lib/components/BaseForm'
import SelectAwardInput from './SelectAwardInput'
import validate from './subthemeValidations'
import { useParams } from 'react-router-dom'
import { createSubtheme } from '@approbado/lib/services/subthemes.service'

const SubthemeCreate = () => {
    const { trivia_id } = useParams()
    const { showNotification } = useUiDispatch();
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        const response = await createSubtheme({
            trivia_id: trivia_id,
            ...values
        });

        if (response.success) {
            history.push(`/trivias/${trivia_id}/subthemes`)
            showNotification(`¡Ha registrado el subtema "${values.title}" exitosamente!`)
        } else {
            return response.data;
        }
    }, [trivia_id])

    return (
        <BaseForm
            save={save}
            validate={validate}
            formName='Crear subtema'
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Tiempo límite'>
                <TextInput
                    type='number'
                    name="duration"
                    placeholder="Tiempo límite"
                    fullWidth
                />
            </InputContainer>
            <SelectAwardInput />
        </BaseForm>
    )
}

export default SubthemeCreate
