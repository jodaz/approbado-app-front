import * as React from 'react'
import {
    Row,
    SelectInput
} from '../../../components';
import { listSubthemes } from '@approbado/lib/services/subthemes.services'
import { Layers } from 'lucide-react-native';
import { REQUIRED_FIELD } from '@approbado/lib/utils/validations'

const SelectThemeInput = ({ control }) => {
    const [subthemes, setSubthemes] = React.useState(null)

    const fetchSubthemes = React.useCallback(async () => {
        const { success, data } = await listSubthemes()

        if (success) {
            setSubthemes(data);
        }
    }, []);

    React.useEffect(() => {
        fetchSubthemes()
    }, [])

    return (
        <Row>
            {subthemes ? (
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
                />
            ) : <></>}
        </Row>
    );
}

export default SelectThemeInput
