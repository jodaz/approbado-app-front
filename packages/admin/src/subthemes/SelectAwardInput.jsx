import * as React from 'react'
import { useParams } from 'react-router-dom'
import { listAwards } from '@approbado/lib/services/awards.services'
import InputContainer from '@approbado/lib/components/InputContainer'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'

const SelectAwardInput = ({ disabled }) => {
    const { trivia_id } = useParams()
    const [options, setOptions] = React.useState([])

    const fetchOptions = React.useCallback(async () => {
        const { success, data } = await listAwards({
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
        <InputContainer disabled={disabled} label="Premio" md={6} xs={6}>
            {(!Object.entries(options).length) ? (
                <Box marginTop='0.5rem' fontSize='0.9rem' fontWeight={300}>
                    Sin datos
                </Box>
            ) : (
                <SelectInput
                    name='award_id'
                    placeholder='Premio'
                    options={options}
                    property='title'
                />
            )}
        </InputContainer>
    )
}

export default SelectAwardInput
