import * as React from 'react'
import { useForm } from 'react-hook-form';
import { Plus } from 'lucide-react-native';
import { Routes } from '../routes';
import Container from '../../components/Container';
import Text from '../../components/Text';
import FloatingButton from '../../components/FloatingButton';
import styled from 'styled-components/native';

const ListForum = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (values) => {
    };

    return (
        <Container>
            <FloatingButton
                icon={<Plus />}
                onPress={() => navigation.navigate(Routes.CreateForum)}
            />
        </Container>
    );
}

export default ListForum
