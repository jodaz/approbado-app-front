import * as React from 'react'
import { Calendar } from '@approbado/lib/icons'
import InputContainer from '@approbado/lib/components/InputContainer'
import { useFormState } from 'react-final-form'
import TextInput from '@approbado/lib/components/TextInput'
import { format } from "date-fns";
import { es } from 'date-fns/locale'
import Box from '@material-ui/core/Box'

const DateInput = ({ submitting }) => {
    const { values: { starts_at } } = useFormState();
    const [value, setValue] = React.useState('')

    React.useEffect(() => {
        if (starts_at) {
            const date = format(new Date(starts_at), 'eee. d, MMMM', { locale: es })
            const dateCapitalize = date.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ')

            setValue(dateCapitalize)
        }
    }, [starts_at])

    return (
        <InputContainer
            disabled={submitting}
            label="Día"
            md={7}
            xs={6}
        >
            <TextInput
                name="day"
                source={value}
                InputProps={{
                    startAdornment: (
                        <Box marginLeft='6px' display='flex'>
                            <Calendar />
                        </Box>
                    )
                }}
            />
        </InputContainer>
    )
}

export default DateInput
