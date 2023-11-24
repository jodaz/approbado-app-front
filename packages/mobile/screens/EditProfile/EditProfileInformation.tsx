import * as React from "react";
import { Routes } from "../routes";
import { ScrollView, Dimensions } from "react-native";
import { useAuth, getUser } from "@approbado/lib/contexts/AuthContext";
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { NAME, LAST_NAME, USERNAME } from "@approbado/lib/utils/validations";
import { Image, TextInput, NavButton } from "../../components";
import { useForm } from "react-hook-form";
import { updateProfile } from '@approbado/lib/services/profile.services'
import setFormErrors from '@approbado/lib/utils/setFormErrors'
import EditProfileHeader from "./components/EditProfileHeader";
import Row from "../../components/Row";
import Text from "../../components/Text";
import styled from "styled-components/native";

const { width } = Dimensions.get("window");

const Container = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: ${(props) => props.theme.space[6]};
    width: ${width * 0.9}px;
    padding-left: ${(props) => props.theme.space[2]};
    padding-right: ${(props) => props.theme.space[2]};
`;

const EditProfileInformation = ({ navigation }) => {
    const {
        state: { user }, dispatch: authDispatch
    } = useAuth();
    const { control, handleSubmit, setError, formState } = useForm({
        defaultValues: {
            names: user?.names,
            last_name: user?.last_name,
            user_name: user?.user_name
        }
    });
    const { dispatch } = useToast()

    const onSubmit = async values => {
        const { success, status, data } = await updateProfile(values);

        if (success) {
            await getUser(authDispatch)
            await openToast(
                dispatch,
                'success',
                '¡Su información fue actualizada!'
            )
            navigation.goBack()
        } else {
            if (status == 422) {
                setFormErrors(setError, data)
            } else {
                await openToast(
                    dispatch,
                    'error',
                    'Ha ocurrido un error.'
                )
            }
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Container>
                <EditProfileHeader
                    isSubmitting={formState.isSubmitting}
                    onSubmit={handleSubmit(onSubmit)}
                    title='Editar perfil'
                />
                <Row size={1} align="center">
                    <Image
                        height={100}
                        width={100}
                        source={user?.picture}
                        borderRadius={50}
                    />
                </Row>
                <Row size={1} align="center">
                    <TextInput
                        name="names"
                        control={control}
                        label="Nombres"
                        validations={NAME}
                    />
                </Row>
                <Row size={1} align="center">
                    <TextInput
                        name="last_name"
                        control={control}
                        label="Apellidos"
                        validations={LAST_NAME}
                    />
                </Row>
                <Row size={1} align="center">
                    <TextInput
                        name="user_name"
                        control={control}
                        label="Usuario"
                        validations={USERNAME}
                    />
                </Row>
                <Row size={1} align="center">
                    <TextInput
                        name="bio"
                        control={control}
                        label="Biografía"
                        multiline
                    />
                </Row>
                <Row size={3}>
                    <Text align="left">
                        Información adicional
                    </Text>
                </Row>
                <NavButton to={Routes.EditProfileContact}>
                    Datos de contacto
                </NavButton>
                <NavButton to={Routes.EditProfileOcupation}>Ocupación</NavButton>
                <NavButton to={Routes.EditProfileSocial}>
                    Redes sociales
                </NavButton>
            </Container>
        </ScrollView>
    );
};

export default EditProfileInformation;
