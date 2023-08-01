import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { JSONAxiosInstance as axios } from '@approbado/lib/api'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'
import BalanceIcon from '@approbado/lib/icons/BalanceIcon'

const SelectTriviasInput = ({ submitting }) => {
    const [trivias, setTrivias] = React.useState([])

    const fetchTrivias = React.useCallback(async () => {
        const { data: { data } } = await axios.get('/trivias')
        setTrivias(data)
    }, []);

    React.useEffect(() => {
        fetchTrivias();
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
                            <BalanceIcon />
                        </Box>
                    ),
                    placeholder: 'Seleccione una trivia'
                }}
            />
        </InputContainer>
    )
}

export default SelectTriviasInput
