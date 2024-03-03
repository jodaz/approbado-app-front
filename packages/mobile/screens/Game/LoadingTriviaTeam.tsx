import * as React from 'react'
import {
    Button,
    Row,
    Text
} from '../../components';
import { View, Image, FlatList } from 'react-native'
import { horizontalScale, scaleFontSize, verticalScale } from '../../styles/scaling';
import { Link } from 'lucide-react-native';
import styled from 'styled-components';

const StyledMessageContainer = styled.View`
    background-color: ${props => props.theme.palette.primary.main};
    border-radius: ${scaleFontSize(21)}px;
    padding-vertical: ${verticalScale(10)}px;
    padding-horizontal: ${horizontalScale(10)}px;
    width: 200px;
`

const User = {
    image: require('../../assets/user.jpeg'),
    fullName: "Federico"
}

const users = [User, User, User, User];

const UserCard = ({ user, size = 50 }) => (
    <View style={{
        marginHorizontal: horizontalScale(10),
        alignItems: 'center'
    }}>
        <Image source={user.image}
            style={{
                borderRadius: 50,
                height: verticalScale(size),
                width: verticalScale(size),
                marginBottom: verticalScale(10)
            }}
        />
        <Text fontWeight={700} align='center'>
            {user.fullName}
        </Text>
    </View>
)

const LoadingTriviaTeam = props => {
    return (
        <View style={{
            flex: 1
        }}>
            <Row align='center'>
                <UserCard user={User} />
            </Row>
            <Row size={3}>
                <Text fontWeight={700} align='center'>
                    VS
                </Text>
            </Row>
            <Row direction='row' size={3} justify='center'>
                <FlatList
                    data={users}
                    renderItem={({ item }) => <UserCard user={item} size={35} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{
                        width: 100
                    }}
                />
            </Row>
            <Row size={1} align='center'>
                <StyledMessageContainer>
                    <Text fontWeight={400} align='center'>
                        Preparando sala...
                    </Text>
                </StyledMessageContainer>
            </Row>
            <Row size={1} align='center'>
                <Button variant='text' icon={<Link />}>
                    Compartir
                </Button>
            </Row>
        </View>
    )
}

export default LoadingTriviaTeam
