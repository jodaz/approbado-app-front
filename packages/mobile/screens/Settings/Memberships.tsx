import React from 'react';
import { SafeAreaView } from 'react-native';
import { Row, Text } from '../../components';
import Container from '../../components/Container';
import TitleBar from '../../components/TitleBar';
import MembershipCard from '../../components/MembershipCard';

const Memberships = ({ navigation }) => (
    <SafeAreaView>
        <Container>
            <TitleBar>
                <Text fontSize={18} fontWeight={600}>
                    Membresía
                </Text>
            </TitleBar>
            <Row size={2}>
                <MembershipCard />
            </Row>
        </Container>
    </SafeAreaView>
);

export default Memberships;
