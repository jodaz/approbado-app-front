import React from 'react';
import { useForm } from 'react-hook-form';
import { SafeAreaView } from 'react-native';
import Row from '../../components/Row';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import Container from '../../components/Container';
import TitleBar from '../../components/TitleBar';
import styled from 'styled-components/native';

const FormContainer = styled.View`
    margin-top: 40px;
    width: 100%;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
`;

const NotificationSettings = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <SafeAreaView>
        <Container>
            <TitleBar title="Ajustes de seguridad" />
            <FormContainer>
                <Row size={1}>
                    <Checkbox
                        control={control}
                        label="Recibir notificaciones generales"
                        name="general_notifications"
                    />
                </Row>
                <Row size={1}>
                    <Checkbox
                        control={control}
                        label="Recibir notificaciones sobre comentarios"
                        name="showNotification_mobile_app"
                    />
                </Row>
                <Row size={1}>
                    <Checkbox
                        control={control}
                        label="Recibir notificaciones sobre mensajería"
                        name="showNotification_email"
                    />
                </Row>
                <Row size={1}>
                    <Checkbox
                        control={control}
                        label="Recibir notificaciones sobre actualización de cuenta"
                        name="showNotification_about_account"
                    />
                </Row>
                <Row size={6}>
                    <Button onPress={handleSubmit(onSubmit)} fullWidth>
                        Guardar cambios
                    </Button>
                </Row>
            </FormContainer>
        </Container>
    </SafeAreaView>
  );
};

export default NotificationSettings;
