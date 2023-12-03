import * as React from 'react'
import { Row, Image, Text } from '../../../components'
import { User } from '@approbado/lib/types/models'
import { useNavigation } from '@react-navigation/native'
import { ArrowLeft } from 'lucide-react-native'

const ChatHeader: React.FC<{ user: User }> = ({ user }) => {
    const navigation = useNavigation();

    return (
        <Row
            direction='row'
            size={1}
            align='center'
        >
            <ArrowLeft
                color='#000'
                size={24}
                onClick={() => navigation.goBack()}
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
        </Row>
    )
}

export default ChatHeader
