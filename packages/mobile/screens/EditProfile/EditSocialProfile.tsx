import * as React from "react";
import { ScrollView, Dimensions } from "react-native";
import { useAuth, getUser } from "@approbado/lib/contexts/AuthContext";
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { TextInput, Row, ScrollViewContainer } from "../../components";
import { useForm } from "react-hook-form";
import { updateSettings } from '@approbado/lib/services/settings.services'
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

const EditSocialProfile = ({ navigation }) => {
    const {
        state: { user }, dispatch: authDispatch
    } = useAuth();
    const { control, handleSubmit, setError, formState } = useForm({
        defaultValues: {
            twitter: user?.profile?.twitter,
            linkedin: user?.profile?.linkedin
        }
    });
    const { dispatch } = useToast()

    const onSubmit = async (values) => {
        const { success, status, data } = await updateSettings({ profile: values });

        if (success) {
            await getUser(authDispatch)
            await openToast(
                dispatch,
                'success',
                '¡Sus redes sociales fueron actualizadas!'
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
                title='Redes sociales'
            />
            <Row size={1} align="center">
                <TextInput
                    name="linkedin"
                    control={control}
                    label="Linkedin"
                />
            </Row>
            <Row size={1} align="center">
                <TextInput
                    name="twitter"
                    control={control}
                    label="Twitter / X"
                />
            </Row>
        </ScrollViewContainer>
    );
};

export default EditSocialProfile;
