import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { listLevels } from '@approbado/lib/services/levels.services'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'
import { Lightbulb } from '@approbado/lib/icons'

const SelectLevelInput = ({ submitting }) => {
    const [levels, setLevels] = React.useState([])

    const fetchLevels = React.useCallback(async () => {
        const { success, data } = await listLevels()

        if (success) {
            setLevels(data);
        }
    }, []);

    React.useEffect(() => {
        fetchLevels()
    }, [])

    if (!Object.entries(levels).length) return null;

    return (
        <InputContainer
            disabled={submitting}
            label="Nivel"
            md={12}
            xs={12}
        >
            <SelectInput
                name='level_id'
                options={levels}
                inputProps={{
                    startAdornment: (
                        <Box marginLeft='6px' display='flex'>
                            <Lightbulb />
                        </Box>
                    ),
                    placeholder: 'Seleccione un nivel'
                }}
            />
        </InputContainer>
    )
}

export default SelectLevelInput
