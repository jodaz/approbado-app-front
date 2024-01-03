import * as React from 'react'
import { FlatList, View } from 'react-native';
import Stage1 from '@approbado/lib/illustrations/Stage1.svg'
import CertificateCard from '../components/CertificateCard';
import { Text } from '../../../components';

const certificates = [
    {
        name: 'Approbado plata',
        title: 'Abogados',
        image: <Stage1 />
    },
    {
        name: 'Approbado bronce',
        title: 'Divorcios',
        image: <Stage1 />
    },
    {
        name: 'Approbado oro',
        title: 'Derecho penal',
        image: <Stage1 />
    },
]

const Certificates = () => {
    const ref = React.useRef()

    return (
        <View>
            <Text variant='secondary'>
                Certificaciones
            </Text>
            <FlatList
                ref={ref}
                data={certificates}
                renderItem={({ item }) => <CertificateCard {...item} />}
                horizontal
                showsHorizontalScrollIndicator={false}
                nestedScrollEnabled
            />
        </View>
    );
}

export default Certificates
