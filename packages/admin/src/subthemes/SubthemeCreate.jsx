import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { useHistory } from 'react-router-dom'
import TextInput from '@approbado/lib/components/TextInput'
import InputContainer from '@approbado/lib/components/InputContainer'
import BaseForm from '@approbado/lib/components/BaseForm'
import { JSONAxiosInstance as axios } from '@approbado/lib/api'
import SelectAwardInput from './SelectAwardInput'
import validate from './subthemeValidations'
import { useParams } from 'react-router-dom'

const SubthemeCreate = () => {
    const { trivia_id } = useParams()
    const { showNotification } = useUiDispatch();
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/subthemes', {
                trivia_id: trivia_id,
                ...values
            });

            if (data) {
                history.push(`/trivias/${data.trivia_id}/subthemes/${data.id}`)
                showNotification(`¡Ha creado el subtema "${data.name}"!`)
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [])

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
