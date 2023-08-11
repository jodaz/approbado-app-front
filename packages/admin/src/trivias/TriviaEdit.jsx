import * as React from 'react'
import { editTrivia } from '@approbado/lib/services/trivias.service'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import BaseForm from '@approbado/lib/components/BaseForm'
import InputContainer from '@approbado/lib/components/InputContainer'
import ImageInput from '@approbado/lib/components/ImageInput'
import Box from '@material-ui/core/Box'
import TextInput from '@approbado/lib/components/TextInput'
import SelectCategoryInput from './SelectCategoryInput';
import SelectInput from '@approbado/lib/components/SelectInput'
import validate from './validateTrivias'
import SelectPlansInput from './SelectPlansInput'

const ACCESS_TYPES = [
    { id: '1', name: 'Gratis' },
    { id: '0', name: 'De pago' }
]

const TriviaEdit = ({ record }) => {
    const [loading, setLoading] = React.useState(false)
    const { showNotification } = useUiDispatch();

    const save = React.useCallback(async ({ file, ...restValues }) => {
        setLoading(true)
        const values = {
            file: file.rawFile,
            ...restValues
        };

        const { data, success } = await editTrivia(record.id, values)

        if (success) {
            setLoading(false)
            showNotification(`¡Ha actualizado la trivia "${data.name}" exitosamente!`)
        } else {
            setLoading(false)
            return data;
        }
    }, [record.id])

    return (
        <BaseForm save={save} validate={validate} loading={loading} record={record}>
            <InputContainer label='Nombre'>
                <TextInput
                    name="name"
                    placeholder="Nombre"
                    fullWidth
                />
            </InputContainer>
            <InputContainer label='Acceso'>
                <SelectInput
                    name="is_free"
                    options={ACCESS_TYPES}
                />
            </InputContainer>
            <InputContainer label='Imagen de portada'>
                <Box marginTop='1rem'>
                    <ImageInput
                        source="file"
                        loading={loading}
                        accept='image/svg+xml,image/png'
                        preview={(record.cover) && `${process.env.REACT_APP_API_DOMAIN}/${record.cover}`}
                        hasPreview={!!record.cover}
                    />
                    <Box width='16rem'>
                        <Box fontSize='14px' fontWeight='400' color='#6D6D6D' margin='1rem 0'>
                            El ícono debe tener una dimensión de 312 x 178 píxeles. Formato PNG o SVG.
                        </Box>
                    </Box>
                </Box>
            </InputContainer>
            <SelectCategoryInput />
            <SelectPlansInput />
        </BaseForm>
    )
}

export default TriviaEdit
