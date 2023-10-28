import { Image } from "react-native"
import styled from "styled-components/native"
import Text from "./Text"

const StyledButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    padding: 8px 14px 10px 17px;
    background-color: #1977F3;
    border-radius: 4px;
`

const StyledText = styled(Text)`
    color: #fff;
    margin-left: 10px;
`

const FacebookLoginButton = () => {
    return (
        <StyledButton>
            <Image source={require('../assets/Facebook.png')} />
            <StyledText fontWeight={400} fontSize={15}>
                Continuar con Facebook
            </StyledText>
        </StyledButton>
    )
}

export default FacebookLoginButton
