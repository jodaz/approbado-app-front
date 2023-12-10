import * as React from 'react'
import { Row, Image, Text } from '../../../components'
import { User } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'lucide-react-native'
import styled from 'styled-components/native'

const Container = styled(Row)`
    padding-left: ${props => props.theme.space[2]};
    padding-right: ${props => props.theme.space[2]}
`

const ChatHeader: React.FC<{ user: User }> = ({ user }) => {
    const navigation = useNavigation();

    return (
        <Container
            align='center'
            direction='row'
            justify='space-between'
            size={4}
        >
            <ArrowLeft
                size={24}
                color='#000'
                onPress={() => navigation.goBack()}
            />
            <Row
                direction='row'
                align='center'
                justify='center'
            >
                <Image source={user.picture} />
                <Text>
                    {user.names}
                </Text>
            </Row>
        </Container>
    )
}

export default ChatHeader
