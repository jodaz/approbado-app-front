import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { editSubtheme } from '@approbado/lib/services/subthemes.services'
import TextInput from '@approbado/lib/components/TextInput'
import InputContainer from '@approbado/lib/components/InputContainer'
import BaseForm from '@approbado/lib/components/BaseForm'
import validate from './subthemeValidations'
import SelectAwardInput from './SelectAwardInput'

const SubthemeEdit = ({ record }) => {
    const { showNotification } = useUiDispatch();

    const save = React.useCallback(async (values) => {
        try {
            const { success, data } = await editSubtheme(record.id, values)

            if (success) {
                showNotification(`¡Ha actualizado el subtema "${data.name}"!`)
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
            record={record}
            validate={validate}
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

export default SubthemeEdit
