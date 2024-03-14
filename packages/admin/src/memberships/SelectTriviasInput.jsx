import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { listTrivias } from '@approbado/lib/services/trivias.services'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'

const SelectTriviaInput = ({ disabled }) => {
    const [options, setOptions] = React.useState([])

    const fetchOptions = React.useCallback(async () => {
        const { success, data } = await listTrivias()

        if (success) {
            setOptions(data)
        }
    }, []);

    React.useEffect(() => {
        fetchOptions();
    }, [])

    return (
        <InputContainer disabled={disabled} label="Trivia" xs={12} md={12}>
            {(!Object.entries(options).length) ? (
                <Box marginTop='0.5rem' fontSize='0.9rem' fontWeight={300}>
                    Sin datos
                </Box>
            ) : (
                <SelectInput
                    name='trivias_ids'
                    multiple
                    options={options}
                    inputProps={{
                        placeholder: 'Tema específico'
                    }}
                />
            )}
        </InputContainer>
    )
}

export default SelectTriviaInput
