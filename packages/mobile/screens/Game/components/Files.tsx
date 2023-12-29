import * as React from 'react'
import { Container, Text } from '../../../components';
import { File } from '@approbado/lib/types/models'
import { listFiles } from '@approbado/lib/services/files.services'
import { ScrollView, Dimensions } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ResourceCard from './ResourceCard';

const { width } = Dimensions.get('screen')


const Resources = ({ route }) => {
    const isFocused = useIsFocused();
    const trivia = route.params.trivia
    const [resources, setResources] = React.useState<[] | File[]>([])

    const fetchResources = async () => {
        const { success, data } = await listFiles({
            filter: {
                trivia_id: trivia.id
            }
        });

        if (success) {
            setResources(data);
        } else {
            console.log("error", data)
        }
    }

    React.useEffect(() => { fetchResources() }, [isFocused])

    if (!resources.length) {
        return (
            <Container>
                <Text>
                    Sin recursos
                </Text>
            </Container>
        )
    }

    return (
        <ScrollView contentContainerStyle={{
            display: 'flex',
            width: width,
            height: '100%',
            flexWrap: 'wrap',
            flexDirection: 'row',
            justifyContent: 'start',
            paddingVertical: 20
        }}>
            {resources.map((file: File) => (
                <ResourceCard file={file} />
            ))}
        </ScrollView>
    );
}

export default Resources
