import * as React from 'react'
import InputContainer from '@approbado/lib/components/InputContainer'
import { useFormState } from 'react-final-form'
import { Layer } from '@approbado/lib/icons';
import { JSONAxiosInstance as axios } from '@approbado/lib/api'
import SelectInput from '@approbado/lib/components/SelectInput'
import Box from '@material-ui/core/Box'

const SubthemesInput = ({ submitting }) => {
    const { values: { trivia_id } } = useFormState();
    const [subthemes, setSubthemes] = React.useState([])

    const fetchSubthemes = React.useCallback(async (trivia) => {
        const { data: { data } } = await axios.get(`/subthemes?filter[trivia_id]=${trivia}`)
        setSubthemes(data)
    }, []);

    React.useEffect(() => {
        if (trivia_id) {
            fetchSubthemes(trivia_id);
        }
    }, [trivia_id])

    if (!trivia_id || !Object.entries(subthemes).length) return null;

    return (
        <InputContainer
            disabled={submitting}
            label="Tema"
            md={12}
            xs={12}
        >
            <SelectInput
                name='subtheme_id'
                options={subthemes}
                inputProps={{
                    startAdornment: (
                        <Box marginLeft='6px' display='flex'>
                            <Layer />
                        </Box>
                    ),
                    placeholder: 'Seleccione un subtema'
                }}
            />
        </InputContainer>
    )
}

export default SubthemesInput
