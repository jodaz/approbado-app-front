import * as React from 'react'
import { Row, Text } from '../../../components'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'lucide-react-native'
import styled from 'styled-components/native'
import { horizontalScale } from '../../../styles/scaling'

const Container = styled(Row)`
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
`

const UserChatHeader: React.FC<{ name: string }> = ({ name }) => {
    const navigation = useNavigation();

    return (
        <Container
            align='center'
            direction='row'
            justify='space-between'
            size={5}
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
                <Text>
                    {name}
                </Text>
            </Row>
        </Container>
    )
}

export default UserChatHeader
