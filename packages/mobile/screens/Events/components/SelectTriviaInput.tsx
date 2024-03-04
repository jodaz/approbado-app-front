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

    const fetchTrivias = React.useCallback(async () => {
        const { success, data } = await listTrivias()

        if (success) {
            setTrivias(data);
        }
    }, []);

    React.useEffect(() => {
        fetchTrivias()
    }, [])

    return (
        <Row>
            {trivias ? (
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
                />
            ) : <></>}
        </Row>
    );
}

export default SelectTriviaInput
