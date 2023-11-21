import React from 'react';
import { SafeAreaView } from 'react-native';
import { Row } from '../../components';
import Container from '../../components/Container';
import TitleBar from '../../components/TitleBar';
import MembershipCard from '../../components/MembershipCard';

const Memberships = ({ navigation }) => (
    <SafeAreaView>
        <Container>
            <TitleBar title="Membresía" />
            <Row size={2}>
                <MembershipCard />
            </Row>
        </Container>
    </SafeAreaView>
);

export default Memberships;
