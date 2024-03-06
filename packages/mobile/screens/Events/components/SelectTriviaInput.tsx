import * as React from 'react'
import {
    Row,
    SelectInput
} from '../../../components';
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { Scale } from 'lucide-react-native';
import { REQUIRED_FIELD } from '@approbado/lib/utils/validations'

const SelectTriviaInput = ({ control }) => {
    const [trivias, setTrivias] = React.useState(null)
    const [loading, setLoading] = React.useState(true)

    const toggleLoading = () => setLoading(!loading)

    const fetchTrivias = React.useCallback(async () => {
        const { success, data } = await listTrivias()

        if (success) {
            toggleLoading()
            setTrivias(data);
        }
    }, []);

    React.useEffect(() => {
        fetchTrivias()
    }, [])

    return (
        <Row>
            <SelectInput
                label='Trivia'
                name='trivia_id'
                control={control}
                placeholder='Seleccione un tema'
                options={trivias}
                labelField='name'
                valueField='id'
                icon={<Scale />}
                validations={REQUIRED_FIELD}
                loading={loading}
            />
        </Row>
    );
}

export default SelectTriviaInput
