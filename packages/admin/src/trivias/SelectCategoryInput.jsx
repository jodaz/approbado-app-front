import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'
import { listCategories } from '@approbado/lib/services/categories.services'

const SelectCategoryInput = ({ disabled }) => {
    const [options, setOptions] = React.useState([])

    const fetchOptions = async () => {
        const { success, data } = await listCategories()
        if (success) {
            setOptions(data)
        }
    };

    React.useEffect(() => {
        fetchOptions();
    }, [])

    return (
        <InputContainer
            disabled={disabled}
            label="Categoría"
            md={6}
            xs={12}
        >
            {(!Object.entries(options).length) ? (
                <Box marginTop='0.5rem' fontSize='0.9rem' fontWeight={300}>
                    Sin datos
                </Box>
            ) : (
                <SelectInput
                    name='category_id'
                    options={options}
                />
            )}
        </InputContainer>
    )
}

export default SelectCategoryInput
