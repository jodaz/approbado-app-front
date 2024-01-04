import * as React from 'react'
import { listSubthemes } from '@approbado/lib/services/subthemes.services'
import { useParams } from 'react-router-dom'
import InputContainer from '@approbado/lib/components/InputContainer'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'

const SelectSubthemeInput = ({ disabled }) => {
    const { trivia_id } = useParams()
    const [options, setOptions] = React.useState([])

    const fetchOptions = React.useCallback(async () => {
        const { success, data } = await listSubthemes({
            filter: {
                trivia_id: trivia_id
            }
        })

        if (success) {
            setOptions(data)
        }
    }, []);

    React.useEffect(() => {
        fetchOptions();
    }, [])

    return (
        <InputContainer disabled={disabled} label="Subtema" md={6} xs={6}>
            {(!Object.entries(options).length) ? (
                <Box marginTop='0.5rem' fontSize='0.9rem' fontWeight={300}>
                    Sin datos
                </Box>
            ) : (
                <SelectInput
                    name='subtheme_id'
                    placeholder='Subtema'
                    options={options}
                />
            )}
        </InputContainer>
    )
}

export default SelectSubthemeInput
