import InputContainer from '@approbado/lib/components/InputContainer'
import SelectInput from '@approbado/lib/components/SelectInput'
import useFetch from '@approbado/lib/hooks/useFetch'
import Box from '@material-ui/core/Box'

const SelectFileInput = ({ trivia_id }) => {
    const { data } = useFetch('/files', {
        filter: { trivia_id: trivia_id }
    })

    return (
        <InputContainer
            sm='12'
            md='6'
            label='Archivos'
        >
            {(!Object.entries(data).length) ? (
                <Box marginTop='0.5rem' fontSize='0.9rem' fontWeight={300}>
                    Sin datos
                </Box>
            ) : (
                <SelectInput
                    name='file_id'
                    placeholder='Seleccione'
                    options={data}
                    property='title'
                />
            )}
        </InputContainer>
    )
}

export default SelectFileInput
