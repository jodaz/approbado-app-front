import React from 'react';
import { SafeAreaView } from 'react-native';
import Container from '../../components/Container';
import TitleBar from '../../components/TitleBar';

const Memberships = ({ navigation }) => (
    <SafeAreaView>
        <Container>
            <TitleBar title="Membresía" />
        </Container>
    </SafeAreaView>
);

export default Memberships;
