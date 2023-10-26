import * as React from 'react'
import { SafeAreaView } from 'react-native';
import { useForm } from 'react-hook-form';
import Container from '../../components/Container';
import Button from '../../components/Button';
import Text from '../../components/Text';
import TitleBar from '../../components/TitleBar';
import Row from '../../components/Row';

const DeleteAccount = ({ navigation }) => {
    const { control, handleSubmit } = useForm();

    const onSubmit = async (values) => {
    };

    return (
        <SafeAreaView>
            <Container>
                <TitleBar title="Ajustes de cuenta" />
                <Row size={4}>
                    <Text fontSize={16} fontWeight={400}>
                        Al realizar el proceso de eliminar tu cuenta de approbado.com,
                        tu nombre visible dentro de la plataforma, tu @usuario y toda
                        la información relacionada dentro de la plataforma ya no se podrán ver en approbado.com
                    </Text>
                </Row>
                <Row size={4}>
                    <Button
                        variant='outlined'
                        onPress={handleSubmit(onSubmit)}
                        fullWidth
                    >
                        Eliminar cuenta
                    </Button>
                </Row>
            </Container>
        </SafeAreaView>
    );
}

export default DeleteAccount
