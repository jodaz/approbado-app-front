import * as React from 'react'
import { Row, Text, TriviaCard } from '../../../components';
import { Trivia } from '@approbado/lib/types/models'
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { FlatList, TouchableOpacity } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import { Routes } from '../../routes';
import { useNavigation } from '@react-navigation/native';

const PopularTrivias = () => {
    const ref = React.useRef()
    const [trivias, setTrivias] = React.useState<[] | Trivia[]>([])
    const navigation = useNavigation()

    const fetchTrivias = async () => {
        const { success, data } = await listTrivias({
            filter: {
                top: true
            }
        });

        if (success) {
            setTrivias(data);
        } else {
            console.log("error", data)
        }
    }

    const handleNavigate = () => navigation.navigate(Routes.Game, {
        screen: Routes.ListTrivias
    })

    React.useEffect(() => { fetchTrivias() }, [])

    return (
        <Row>
            <Row justify='space-between' direction='row'>
                <Text variant='primary' fontSize={22}>
                    Pruebas populares
                </Text>
                {trivias.length ? (
                    <TouchableOpacity onPress={handleNavigate}>
                        <ArrowRight
                            color='#000'
                            size={24}
                        />
                    </TouchableOpacity>
                ) : null}
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

export default PopularTrivias
