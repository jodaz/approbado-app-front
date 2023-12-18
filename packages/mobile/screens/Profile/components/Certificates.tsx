import * as React from 'react'
import { FlatList } from 'react-native';
import Stage1 from '@approbado/lib/illustrations/Stage1.svg'
import CertificateCard from '../components/CertificateCard';

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
        <FlatList
            ref={ref}
            data={certificates}
            renderItem={({ item }) => <CertificateCard {...item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled
        />
    );
}

export default Certificates
