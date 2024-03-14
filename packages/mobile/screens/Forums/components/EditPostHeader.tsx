import { useNavigation } from "@react-navigation/native"
import {
    Row,
    Text,
    Button
} from "../../../components"
import { Routes } from "../../routes"

const EditPostHeader = () => {
    const navigation = useNavigation();

    return (
        <Row align='center' direction='row' justify='space-between' size={2}>
            <Text>
                Crear nuevo debate
            </Text>
            <Button
                textVariant='main'
                textColor='error'
                variant="text"
                onPress={() => navigation.goBack()}
            >
                Cancelar
            </Button>
        </Row>
    )
}

export default EditPostHeader
