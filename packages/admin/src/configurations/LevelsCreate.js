import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { validateLevel } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import CustomColorPicker from './CustomColorPicker'
import TextInput from '@approbado/lib/components/TextInput'
import { axios } from '@approbado/lib/providers'
import { useHistory } from 'react-router-dom'

const LevelCreate = () => {
    const { showNotification } = useUiDispatch();
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/configurations/levels', values)

            if (data) {
                history.push(`/configurations/levels`)
                showNotification(`¡Ha registrado el nivel "${data.name}"!`)
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, []);

    return (
        <BaseForm save={save} validate={validateLevel} formName='Nuevo nivel'>
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Color'>
                <CustomColorPicker label='' />
            </InputContainer>
        </BaseForm>
    )
}

export default LevelCreate
