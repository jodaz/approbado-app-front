import * as React from 'react'
import { Dimensions } from 'react-native';
import { horizontalScale, verticalScale } from '../../../styles/scaling';
import { useAuth } from '@approbado/lib/contexts/AuthContext'
import { Row } from '../../../components';
import ProfileInformationCard from '../components/ProfileInformationCard';
import Stage1 from '@approbado/lib/illustrations/Stage1.svg'
import Forum from '@approbado/lib/illustrations/Forum.svg'
import Forum2 from '@approbado/lib/illustrations/Forum2.svg'
import Ribbon from '@approbado/lib/illustrations/Ribbon.svg'
import styled from 'styled-components/native';
import Certificates from './Certificates';

const { width } = Dimensions.get('window');

const Container = styled.ScrollView`
    padding-top: ${(props) => verticalScale(props.theme.space[2])};
    width: ${width - horizontalScale(40)}px;
`

const Achievements = () => {
    const { state: { user } } = useAuth();

    return (
        <Container>
            <Row size={1} align='center'>
                <ProfileInformationCard
                    image={<Stage1 />}
                    amount={user?.profile.points}
                    text='Puntos'
                />
                <ProfileInformationCard
                    image={<Forum />}
                    amount={user?.comments.length}
                    text='Debates respondidos'
                />
                <ProfileInformationCard
                    image={<Forum2 />}
                    amount={user?.posts.length}
                    text='Debates publicados'
                />
                <ProfileInformationCard
                    image={<Ribbon />}
                    amount={user?.awards.length}
                    text='Certificaciones'
                />
            </Row>
            <Row size={1}>
                <Certificates user={user} />
            </Row>
        </Container>
    );
}

export default Achievements
