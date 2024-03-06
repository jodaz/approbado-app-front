import * as React from 'react'
import {
    Row,
    MultiSelectInput,
    Image,
    Text
} from '../../../components';
import { listUsers } from '@approbado/lib/services/users.services'
import { REQUIRED_FIELD } from '@approbado/lib/utils/validations'
import { View } from 'react-native';

const SelectParticipantsInput = ({ control }) => {
    const [users, setUsers] = React.useState(null)

    const renderItem = item => {
        return (
            <View style={{
                flexDirection: 'row'
            }}>
                <Image source={item.picture} />
                <View style={{ flex: 1 }}>
                    <Text fontSize={18}>
                        {item.user_name}
                    </Text>
                    <Text fontSize={16} variant='secondary'>
                        {item.email}
                    </Text>
                </View>
            </View>
        );
    };

    const fetchUsers = React.useCallback(async () => {
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
        fetchUsers()
    }, [])

    return (
        <Row>
            {users ? (
                <MultiSelectInput
                    label='Participantes'
                    name='users_ids'
                    control={control}
                    placeholder='Seleccione un usuario'
                    options={users}
                    labelField='user_name'
                    valueField='id'
                    renderItem={renderItem}
                    validations={REQUIRED_FIELD}
                />
            ) : <></>}
        </Row>
    );
}

export default SelectParticipantsInput
