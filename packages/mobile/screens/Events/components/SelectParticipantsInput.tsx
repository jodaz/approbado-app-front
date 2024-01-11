import * as React from 'react'
import {
    Row,
    MultiSelectInput
} from '../../../components';
import { listUsers } from '@approbado/lib/services/users.services'

const SelectParticipantsInput = ({ control }) => {
    const [users, setUsers] = React.useState(null)

    const fetchTrivias = React.useCallback(async () => {
        const { success, data } = await listUsers({
            filter: {
                rol: 'user',
                notCurrent: true
            }
        })

        if (success) {
            setUsers(data);
        }
    }, []);

    React.useEffect(() => {
        fetchTrivias()
    }, [])

    return (
        <Row>
            {users ? (
                <MultiSelectInput
                    label='Usuario'
                    name='users_ids'
                    control={control}
                    placeholder='Seleccione un usuario'
                    options={users}
                    labelField='user_name'
                    valueField='id'
                />
            ) : null}
        </Row>
    );
}

export default SelectParticipantsInput
