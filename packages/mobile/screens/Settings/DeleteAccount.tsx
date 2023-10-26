import * as React from 'react'
import { SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import Container from '../../components/Container';
import InnerContainer from '../../components/InnerContainer';
import Button from '../../components/Button';
import styled from 'styled-components/native';
import Text from '../../components/Text';
import TitleBar from '../../components/TitleBar';

const DeleteAccount = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (values) => {
    };

    return (
        <SafeAreaView>
            <Container>
                <InnerContainer>
                    <TitleBar title="Ajustes de cuenta" />
                    <Text fontSize={16} fontWeight={400}>
                        Al realizar el proceso de eliminar tu cuenta de approbado.com,
                        tu nombre visible dentro de la plataforma, tu @usuario y toda
                        la información relacionada dentro de la plataforma ya no se podrán ver en approbado.com
                    </Text>
                    <Button
                        variant='outlined'
                        onPress={handleSubmit(onSubmit)}
                        fullWidth
                    >
                        Eliminar cuenta
                    </Button>
                </InnerContainer>
            </Container>
        </SafeAreaView>
    );
}

export default DeleteAccount
