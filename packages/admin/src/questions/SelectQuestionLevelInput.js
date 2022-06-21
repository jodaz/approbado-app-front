import InputContainer from '@approbado/lib/components/InputContainer'
import SelectInput from '@approbado/lib/components/SelectInput'
import useFetch from '@approbado/lib/hooks/useFetch'
import Box from '@material-ui/core/Box'

const SelectLevelInput = () => {
    const { data } = useFetch('/configurations/levels')

    return (
        <InputContainer
            sm='12'
            md='6'
            label='Nivel'
        >
            {(!Object.entries(data).length) ? (
                <Box marginTop='0.5rem' fontSize='0.9rem' fontWeight={300}>
                    Sin datos
                </Box>
            ) : (
                <SelectInput
                    name='level_id'
                    placeholder='Seleccione un nivel'
                    options={data}
                />
            )}
        </InputContainer>
    )
}

export default SelectLevelInput
