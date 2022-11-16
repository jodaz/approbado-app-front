import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { useHistory, useParams } from 'react-router-dom'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import SelectCategoriesInput from './SelectCategoriesInput'
import SelectTriviaInput from './SelectTriviaInput'
import TextInput from '@approbado/lib/components/TextInput'
import Spinner from '../../components/Spinner'
import { axios } from '../../providers'
import validateForum from './validate'

const ForumEdit = () => {
    const { id } = useParams();
    const [record, setRecord] = React.useState({})
    const history = useHistory()
    const { showNotification } = useUiDispatch();

    const save = async (values) => {
        try {
            const { data } = await axios.put(`forums/${record.id}`, values)

            if (data) {
                history.push(`/forums/${record.id}`)
                showNotification('Se ha completado la actualización con éxito')
            }
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }

    React.useEffect(async () => {
        if (id) {
            const { data } = await axios.get(`/forums/${id}`)

            if (data) {
                setRecord(data)
            }
        }
    }, [id])

    if (!Object.entries(record).length) return <Spinner />

    return (
        <BaseForm
            save={save}
            record={record}
            validate={validateForum}
            formName='Editar foro'
        >
            <InputContainer label='Título' sx={12} md={6}>
                <TextInput
                    name="message"
                    placeholder="Ingrese un título"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Descripción' sx={12} md={6}>
                <TextInput
                    name="summary"
                    placeholder="Ingrese una descripción (Opcional)"
                    fullWidth
                    multiline
                />
            </InputContainer>
            <SelectTriviaInput />
            <SelectCategoriesInput />
        </BaseForm>
    )
}

export default ForumEdit
