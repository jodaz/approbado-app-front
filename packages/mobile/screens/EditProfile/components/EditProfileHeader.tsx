import * as React from "react";
import { X, Check } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Row, Text } from "../../../components";
import { horizontalScale, verticalScale } from "../../../styles/scaling";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
    padding-vertical: ${props => verticalScale(props.theme.space[2])}px;
    padding-horizontal: ${props => horizontalScale(props.theme.space[2])}px;
`

interface IEditProfileHeader {
    onSubmit: () => void;
    isSubmitting: boolean;
    title: string;
}

const EditProfileHeader = ({ onSubmit, isSubmitting, title } : IEditProfileHeader) => {
    const navigation = useNavigation()

    return (
        <Row
            align="center"
            justify="space-between"
            direction="row"
        >
            <Button
                disabled={isSubmitting}
                onPress={() => navigation.goBack()}
            >
                <X size={24} color="#000" />
            </Button>
            <Text fontSize={18} fontWeight={600}>
                {title}
            </Text>
            <Button
                disabled={isSubmitting}
                onPress={onSubmit}
            >
                <Check size={24} color="#206FCA" />
            </Button>
        </Row>
    );
};

export default EditProfileHeader;
