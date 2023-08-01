import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { apiProvider as axios } from '@approbado/lib/api'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'

const SelectCategoriesInput = ({ disabled }) => {
    const [options, setOptions] = React.useState([])

    const fetchOptions = React.useCallback(async () => {
        const { data: { data } } = await axios.get(`configurations/categories`)
        setOptions(data)
    }, []);

    React.useEffect(() => {
        fetchOptions();
    }, [])

    return (
        <InputContainer disabled={disabled} label="Etiquetas" xs={12} md={6}>
            {(!Object.entries(options).length) ? (
                <Box marginTop='0.5rem' fontSize='0.9rem' fontWeight={300}>
                    Sin datos
                </Box>
            ) : (
                <SelectInput
                    name='categories_ids'
                    multiple
                    options={options}
                    inputProps={{
                        placeholder: 'Etiquetas en específico'
                    }}
                />
            )}
        </InputContainer>
    )
}

export default SelectCategoriesInput
