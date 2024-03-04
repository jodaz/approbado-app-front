import * as React from 'react'
import {
    Row,
    SelectInput
} from '../../../components';
import { listLevels } from '@approbado/lib/services/levels.services'
import { Lightbulb } from 'lucide-react-native';
import { REQUIRED_FIELD } from '@approbado/lib/utils/validations'

const SelectLevelInput = ({ control }) => {
    const [levels, setLevels] = React.useState(null)

    const fetchLevels = React.useCallback(async () => {
        const { success, data } = await listLevels()

        if (success) {
            setLevels(data);
        }
    }, []);

    React.useEffect(() => {
        fetchLevels()
    }, [])


    return (
        <Row>
            {levels ? (
                <SelectInput
                    label='Nivel'
                    name='level_id'
                    control={control}
                    placeholder='Seleccione un nivel'
                    options={levels}
                    labelField='name'
                    valueField='id'
                    icon={<Lightbulb />}
                    validations={REQUIRED_FIELD}
                />
            ) : <></>}
        </Row>
    );
}

export default SelectLevelInput
