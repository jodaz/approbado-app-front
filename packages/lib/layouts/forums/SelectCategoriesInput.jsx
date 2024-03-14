import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { listCategories } from '@approbado/lib/services/categories.services'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'

const SelectCategoriesInput = ({ disabled }) => {
    const [options, setOptions] = React.useState([])

    const fetchCategories = React.useCallback(async () => {
        const { success, data } = await listCategories()

        if (success) {
            setOptions(data);
        }
    }, []);

    React.useEffect(() => {
        fetchCategories();
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
