import * as React from 'react'
import { FlatList, View } from 'react-native';
import { Text } from '../../../components';
import { useIsFocused } from '@react-navigation/native';
import { Award, User } from '@approbado/lib/types/models';
import { listAwards } from '@approbado/lib/services/awards.services';
import { verticalScale } from '../../../styles/scaling';
import CertificateCard from '../components/CertificateCard';

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
                user_id: user.id
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
            {awards.length ? (
                <>
                    <Text fontWeight={400} fontSize={18}>
                        Sin certificaciones
                    </Text>
                    <FlatList
                        ref={ref}
                        data={awards}
                        renderItem={({ item }) => <CertificateCard item={item} />}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        nestedScrollEnabled
                        style={{
                            marginTop: verticalScale(4)
                        }}
                    />
                </>
            ) : null}
        </View>
    );
}

export default Certificates
