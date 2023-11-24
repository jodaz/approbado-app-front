import * as React from "react";
import { X, Check } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Row, Text } from "../../../components";
import styled from "styled-components/native";

const Button = styled.TouchableOpacity`
    padding: ${props => props.theme.space[2]};
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
            size={2}
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
