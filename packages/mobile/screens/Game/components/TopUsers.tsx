import * as React from 'react'
import { Image, Row, Text } from '../../../components';
import { User } from '@approbado/lib/types/models'
import { listUsers } from '@approbado/lib/services/users.services'
import { FlatList } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { ArrowRight } from 'lucide-react-native';
import { Routes } from '../../routes';
import { horizontalScale } from '../../../styles/scaling';
import styled from 'styled-components/native'
import Emoji from 'react-native-emoji';

const ButtonWrapper = styled.TouchableOpacity`
    margin-right: ${props => horizontalScale(props.theme.space[2])}
`

const UserCard = ({ navigation, user }) => {
    return (
        <ButtonWrapper onPress={() => navigation.navigate(Routes.Profile, {
            user: user
        })}>
            <Image
                source={user.picture}
                width={40}
                height={40}
            />
        </ButtonWrapper>
    )
}

const TopUsers = () => {
    const isFocused = useIsFocused();
    const [users, setUsers] = React.useState([])
    const navigation = useNavigation()

    const fetchTopUsers = async () => {
        const { success ,data } = await listUsers({
            sort: { field: 'points', order: 'DESC'},
            filter: { is_registered: true },
            perPage: 10
        })

        if (success) {
            setUsers(data)
        }
    }

    React.useEffect(() => { fetchTopUsers() }, [isFocused])

    return (
        <Row>
            <Row direction='row' justify='space-between'>
                <Text>
                    Top Usuarios
                </Text>
                {users.length ? (
                    <ButtonWrapper onPress={() => navigation.navigate(Routes.TopUsers)}>
                        <ArrowRight
                            color='#000'
                            size={24}
                        />
                    </ButtonWrapper>
                ) : null}
            </Row>
            <FlatList
                data={users}
                renderItem={({ item } : { item: User }) => <UserCard user={item} />}
                showsHorizontalScrollIndicator={false}
                horizontal
                ListEmptyComponent={
                    <Row>
                        <Text fontWeight={400} fontSize={18}>
                            No tenemos jugadores disponibles{' '}<Emoji name='sob' />
                        </Text>
                    </Row>
                }
            />
        </Row>
    );
}

export default TopUsers
