import * as React from 'react'
import { Row, Text, TriviaCard } from '../../../components';
import { Trivia } from '@approbado/lib/types/models'
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { FlatList } from 'react-native';
import { ArrowRight } from 'lucide-react-native';

const RecentTrivias = () => {
    const ref = React.useRef()
    const [trivias, setTrivias] = React.useState<[] | Trivia[]>([])

    const fetchTrivias = async () => {
        const { success, data } = await listTrivias();

        if (success) {
            setTrivias(data);
        } else {
            console.log("error", data)
        }
    }

    React.useEffect(() => { fetchTrivias() }, [])

    return (
        <Row>
            <Row justify='space-between' direction='row'>
                <Text variant='primary' fontSize={22}>
                    Pruebas recientes
                </Text>
                <ArrowRight color='#000' size={24} />
            </Row>
            <FlatList
                ref={ref}
                data={trivias}
                renderItem={({ item }) => <TriviaCard trivia={item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
                ListEmptyComponent={
                    <Row>
                        <Text fontSize={18} fontWeight={400}>
                            No hay pruebas disponibles
                        </Text>
                    </Row>
                }
            />
        </Row>
    );
}

export default RecentTrivias
