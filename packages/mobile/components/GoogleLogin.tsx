import { Image } from "react-native"
import styled from "styled-components/native"
import Text from "./Text"
import DropShadow from "react-native-drop-shadow";

const StyledButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    padding: 8px 14px 10px 17px;
    border-radius: 4px;
`

const StyledText = styled(Text)`
    margin-left: 10px;
`

const GoogleLoginButton = () => {
    return (
        <StyledButton>
            <Image source={require('../assets/google.png')} />
            <StyledText fontWeight={400} fontSize={15}>
                Continuar con Google
            </StyledText>
        </StyledButton>
    )
}

export default GoogleLoginButton
