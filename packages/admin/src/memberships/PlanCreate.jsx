import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { validatePlan } from './plansValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import TextInput from '@approbado/lib/components/TextInput'
import SelectInput from '@approbado/lib/components/SelectInput'
import { useHistory } from 'react-router-dom'
import { apiProvider as axios } from '@approbado/lib/api'
import SelectTriviasInput from './SelectTriviasInput';

const ACCESS_TYPES = [
    { id: '1', name: 'Permitido' },
    { id: '0', name: 'Denegado' }
]

const PlanCreate = () => {
    const history = useHistory()
    const { showNotification } = useUiDispatch();

    const save = React.useCallback(async (values) => {
        try {
            const { data } = await axios.post('/memberships/plans', values)

            if (data) {
                history.push(`/memberships/plans`)
                showNotification(`¡Ha registrado el plan "${data.name}"!`)
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
            validate={validatePlan}
            formName='Crear membresía'
        >
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Ingresa el nombre de la membresía"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Monto'>
                <TextInput
                    type='number'
                    name="amount"
                    placeholder="Ingresa el precio de la membresía"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Trivias grupales gratis'>
                <TextInput
                    type='number'
                    name="trivias_in_teams"
                    placeholder="Cantidad"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Duración de la membresía'>
                <TextInput
                    type='number'
                    name="duration"
                    placeholder="Duración en meses"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Acceso al foro'>
                <SelectInput
                    name="forum_access"
                    options={ACCESS_TYPES}
                />
            </InputContainer>
            <SelectTriviasInput />
        </BaseForm>
    )
}

export default PlanCreate
