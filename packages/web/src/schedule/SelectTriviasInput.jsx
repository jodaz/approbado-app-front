import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { listTrivias } from '@approbado/lib/services/trivias.services'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'
import {
    Balance
} from '@approbado/lib/icons'

const SelectTriviasInput = ({ submitting }) => {
    const [trivias, setTrivias] = React.useState([])

    const fetchTrivias = React.useCallback(async () => {
        const { success, data } = await listTrivias()

        if (success) {
            setTrivias(data);
        }
    }, []);

    React.useEffect(() => {
        fetchTrivias()
    }, [])

    if (!Object.entries(trivias).length) return null;

    return (
        <InputContainer
            disabled={submitting}
            label="Trivia"
            md={12}
            xs={12}
        >
            <SelectInput
                name='trivia_id'
                options={trivias}
                inputProps={{
                    startAdornment: (
                        <Box marginLeft='6px' display='flex'>
                            <Balance size='1.5em' />
                        </Box>
                    ),
                    placeholder: 'Seleccione una trivia'
                }}
            />
        </InputContainer>
    )
}

export default SelectTriviasInput
