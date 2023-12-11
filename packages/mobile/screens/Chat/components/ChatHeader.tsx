import * as React from 'react'
import { Row, Text } from '../../../components'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'lucide-react-native'
import styled from 'styled-components/native'

const Container = styled(Row)`
    padding-left: ${props => props.theme.space[2]};
    padding-right: ${props => props.theme.space[2]};
`

const ChatHeader: React.FC<{ name: string }> = ({ name }) => {
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
                <Text>
                    {name}
                </Text>
            </Row>
        </Container>
    )
}

export default ChatHeader
