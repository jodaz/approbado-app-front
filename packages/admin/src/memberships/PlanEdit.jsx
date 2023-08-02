import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { validatePlan } from './plansValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { useParams, useHistory } from 'react-router-dom'
import TextInput from '@approbado/lib/components/TextInput'
import SelectInput from '@approbado/lib/components/SelectInput'
import Spinner from '@approbado/lib/components/Spinner'
import SelectTriviasInput from './SelectTriviasInput';
import { apiProvider as axios } from '@approbado/lib/api'

const ACCESS_TYPES = [
    { id: '1', name: 'Permitido' },
    { id: '0', name: 'Denegado' }
]

const PlanEdit = () => {
    const { showNotification } = useUiDispatch();
    const history = useHistory()
    const { id } = useParams();
    const [record, setRecord] = React.useState({})

    const save = async (values) => {
        console.log(values)
        try {
            const { data } = await axios.put(`/memberships/plans/${record.id}`, values)

            if (data) {
                history.push('/memberships/plans')
                showNotification(`¡Ha actualizado el plan ${data.name}!`);
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    };

    const fetchRecord = async () => {
        const { data } = await axios.get(`/memberships/plans/${id}`);

        if (data) {
            data.trivias_ids = data.trivias;

            setRecord(data)
        }
    };

    React.useEffect(() => {
        fetchRecord()
    }, [])

    if (!Object.entries(record).length) return <Spinner />

    return (
        <BaseForm
            save={save}
            validate={validatePlan}
            formName='Crear membresía'
            record={record}
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

export default PlanEdit
