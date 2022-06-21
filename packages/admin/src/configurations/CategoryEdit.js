import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { validateCategory } from './configurationsValidations';
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import { useHistory, useParams } from 'react-router-dom'
import TextInput from '@approbado/lib/components/TextInput'
import { axios } from '@approbado/lib/providers';
import Spinner from '@approbado/lib/components/Spinner'

const CategoryEdit = () => {
    const { id } = useParams();
    const [loading, setLoading] = React.useState(false)
    const [record, setRecord] = React.useState({})
    const history = useHistory();
    const { showNotification } = useUiDispatch();

    const save = React.useCallback(async (values) => {
        setLoading(true)
        try {
            const { data } = await axios.put(`/configurations/categories/${id}`, values);

            setLoading(false)

            if (data) {
                showNotification(`¡Ha editado la categoría "${data.name}!`);
                history.push('/configurations?tab=categories')
            }
        } catch (error) {
            setLoading(false)

            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }, [])

    React.useEffect(async () => {
        if (id) {
            const { data } = await axios.get(`/configurations/categories/${id}`)

            if (data) {
                setRecord(data)
            }
        }
    }, [id])

    if (!Object.entries(record).length) return <Spinner />

    return (
        <BaseForm
            save={save}
            validate={validateCategory}
            record={record}
            saveButtonLabel='Actualizar'
            loading={loading}
            formName="Editar categoría"
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

export default CategoryEdit
