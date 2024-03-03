import * as React from 'react'
import {
    Container,
    Row,
    Text
} from '../../components';
import { View, Image, FlatList } from 'react-native'
import { horizontalScale, scaleFontSize, verticalScale } from '../../styles/scaling';
import { Scale, Clock } from 'lucide-react-native';

const User = {
    image: require('../../assets/user.jpeg'),
    fullName: "Federico"
}

const users = [User, User, User, User];

const UserCard = ({ user, size = 50, isWaiting = false }) => (
    <View style={{
        alignItems: 'flex-center',
        flexDirection: 'row',
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: scaleFontSize(6),
        marginHorizontal: horizontalScale(10),
        paddingHorizontal: horizontalScale(10),
        marginVertical: verticalScale(4),
        paddingVertical: verticalScale(4)
    }}>
        <Image source={user.image}
            style={{
                borderRadius: 50,
                height: verticalScale(size),
                width: verticalScale(size)
            }}
        />
        <View style={{ flex: 1, marginLeft: horizontalScale(10), justifyContent: 'center' }}>
            <Text fontWeight={700} align='left'>
                {user.fullName}
            </Text>
        </View>
        <View style={{ justifyContent: 'center' }}>
            {isWaiting ? (
                <Clock size={24} color='#000' />
            ) : (
                <Text fontWeight={700} align='left'>
                    12 / 16
                </Text>
            )}
        </View>
    </View>
)

const LoadingResults = props => {
    return (
        <Container>
            <Row size={3} align='center' direction='row' justify='space-between'>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Scale size={24} color='#000' />
                    <Text align='center'>
                        {' '} Derecho laboral
                    </Text>
                </View>
            </Row>
            <Row direction='row' size={3} justify='center'>
                <FlatList
                    data={users}
                    renderItem={({ item }) => <UserCard user={item} size={35} />}
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: 100
                    }}
                />
            </Row>
            <Row size={3}>
                <Text fontWeight={700} align='left'>
                    En espera...
                </Text>
            </Row>
            <Row direction='row' size={3} justify='center'>
                <FlatList
                    data={users}
                    renderItem={({ item }) => <UserCard user={item} size={35} isWaiting />}
                    showsVerticalScrollIndicator={false}
                    style={{
                        width: 100
                    }}
                />
            </Row>
        </Container>
    )
}

export default LoadingResults
