import * as React from 'react'
import { useForm } from 'react-hook-form';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

const ForgetPassword = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (values) => {
    };

    return (
        <Container>
        </Container>
    );
}

export default ForgetPassword
