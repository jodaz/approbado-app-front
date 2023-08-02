import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { validateCategory } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import TextInput from '@approbado/lib/components/TextInput'
import { apiProvider as axios } from '@approbado/lib/api'
import { useHistory } from 'react-router-dom'

const CategoryCreate = () => {
    const { showNotification } = useUiDispatch();
    const history = useHistory()

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/configurations/categories', values)

            if (data) {
                history.push(`/configurations/categories`)
                showNotification(`¡Ha registrado la categoría "${data.name}"!`)
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, []);

    return (
        <BaseForm
            save={save}
            validate={validateCategory}
            formName='Agregar categoría'
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
        </BaseForm>
    )
}

export default CategoryCreate
