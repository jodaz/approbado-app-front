import React from 'react';
import { Row } from '../../components';
import Container from '../../components/Container';
import MembershipCard from '../../components/MembershipCard';

const Memberships = ({ navigation }) => (
    <Container>
        <Row size={2}>
            <MembershipCard />
        </Row>
    </Container>
);

export default Memberships;
