import * as React from "react";
import { Routes } from "../routes";
import { ScrollView, Dimensions } from "react-native";
import { X, Check } from "lucide-react-native";
import { useAuth, getUser } from "@approbado/lib/contexts/AuthContext";
import { openToast, useToast } from '@approbado/lib/contexts/ToastContext';
import { NAME, EMAIL, USERNAME } from "@approbado/lib/utils/validations";
import { Image, TextInput, NavButton } from "../../components";
import { useForm } from "react-hook-form";
import { updateSettings } from '@approbado/lib/services/settings.services'
import setFormErrors from '@approbado/lib/utils/setFormErrors'
import Button from "../../components/Button";
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
        <ScrollView>
            <Container>
                <Row
                    size={2}
                    align="center"
                    justify="space-between"
                    direction="row"
                >
                    <Button
                        disabled={formState.isSubmitting}
                        variant="text"
                        onPress={() => navigation.goBack()}
                    >
                        <X size={24} color="#000" />
                    </Button>
                    <Text fontSize={16}>Datos de contacto</Text>
                    <Button
                        disabled={formState.isSubmitting}
                        variant="text"
                        onPress={handleSubmit(onSubmit)}
                    >
                        <Check size={24} color="#000" />
                    </Button>
                </Row>
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
            </Container>
        </ScrollView>
    );
};

export default EditSocialProfile;
