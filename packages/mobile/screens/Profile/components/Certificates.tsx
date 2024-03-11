import * as React from 'react'
import { FlatList, View } from 'react-native';
import CertificateCard from '../components/CertificateCard';
import { Text } from '../../../components';
import { useIsFocused } from '@react-navigation/native';
import { Award, User } from '@approbado/lib/types/models';
import { listAwards } from '@approbado/lib/services/awards.services';

interface ICertificatesProps {
    user: User
}

const Certificates = ({ user } : ICertificatesProps) => {
    const ref = React.useRef()
    const isFocused = useIsFocused()
    const [awards, setAwards] = React.useState<Award[] | []>([]);

    const fetchData = async () => {
        const { success, data } = await listAwards({
            filter: {
                user: user.id
            },
            sort: { field: 'created_at', order: 'DESC'}
        });

        if (success) {
            setAwards(data)
        }
    }

    React.useEffect(() => { fetchData() }, [isFocused])

    return (
        <View>
            <Text variant='secondary'>
                Certificaciones
            </Text>
            {!awards.length ? (
                <Text>
                    Sin certificaciones
                </Text>
            ) : (
                <FlatList
                    ref={ref}
                    data={awards}
                    renderItem={({ item }) => <CertificateCard {...item} />}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                />
            )}
        </View>
    );
}

export default Certificates
