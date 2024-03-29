import * as React from "react";
import { ScrollView, Dimensions } from "react-native";
import { useAuth, getUser } from "@approbado/lib/contexts/AuthContext";
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { PHONE, EMAIL } from "@approbado/lib/utils/validations";
import { TextInput, Row, ScrollViewContainer } from "../../components";
import { useForm } from "react-hook-form";
import { updateProfile } from '@approbado/lib/services/profile.services'
import { horizontalScale, verticalScale } from "../../styles/scaling";
import EditProfileHeader from "./components/EditProfileHeader";
import setFormErrors from '@approbado/lib/utils/setFormErrors'
import styled from "styled-components/native";

const { width } = Dimensions.get("window");

const Container = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-top: ${(props) => verticalScale(props.theme.space[6])}px;
    width: ${width * 0.9}px;
    padding-horizontal: ${(props) => horizontalScale(props.theme.space[2])}px;
`;

const EditProfileContact = ({ navigation }) => {
    const {
        state: { user }, dispatch: authDispatch
    } = useAuth();
    const { control, handleSubmit, setError, formState } = useForm({
        defaultValues: {
            phone: user?.phone,
            email: user?.email
        }
    });
    const { dispatch } = useToast()

    const onSubmit = async (values) => {
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
        <ScrollViewContainer>
            <EditProfileHeader
                isSubmitting={formState.isSubmitting}
                onSubmit={handleSubmit(onSubmit)}
                title='Datos de contacto'
            />
            <Row size={1} align="center">
                <TextInput
                    name="phone"
                    control={control}
                    label="Número de teléfono"
                    validations={PHONE}
                />
            </Row>
            <Row size={1} align="center">
                <TextInput
                    name="email"
                    control={control}
                    label="Email"
                    validations={EMAIL}
                />
            </Row>
        </ScrollViewContainer>
    );
};

export default EditProfileContact;
