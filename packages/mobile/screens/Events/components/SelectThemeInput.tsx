import * as React from 'react'
import {
    Row,
    SelectInput
} from '../../../components';
import { listSubthemes } from '@approbado/lib/services/subthemes.services'
import { Layers } from 'lucide-react-native';
import { REQUIRED_FIELD } from '@approbado/lib/utils/validations'

const SelectThemeInput = ({ control, trivia_id }) => {
    const [loading, setLoading] = React.useState(false)
    const [subthemes, setSubthemes] = React.useState(null)

    const toggleLoading = () => setLoading(!loading)

    const fetchSubthemes = async () => {
        setSubthemes(null);
        toggleLoading()
        const { success, data } = await listSubthemes({
            filter: {
                trivia_id: trivia_id
            }
        })

        if (success) {
            toggleLoading()
            setSubthemes(data);
        }
    };

    React.useEffect(() => {
        fetchSubthemes()
    }, [trivia_id])

    return (
        <Row>
            <SelectInput
                label='Tema'
                name='subtheme_id'
                control={control}
                placeholder='Seleccione un tema'
                options={subthemes}
                labelField='name'
                valueField='id'
                icon={<Layers />}
                validations={REQUIRED_FIELD}
                loading={loading}
            />
        </Row>
    );
}

export default SelectThemeInput
