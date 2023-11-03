import * as React from 'react'
import { Image } from "react-native"
import { useNavigation } from '@react-navigation/native'
import { Routes } from '../screens/routes'
import { socialLogin, useAuth } from '@approbado/lib/contexts/AuthContext'
import * as WebBrowser from 'expo-web-browser'
import styled from "styled-components/native"
import Text from "./Text"
import * as Google from 'expo-auth-session/providers/google'
import CONFIG_NAMES from "@approbado/lib/env"

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

WebBrowser.maybeCompleteAuthSession()

const GoogleLoginButton = () => {
    const { dispatch } = useAuth()
    const navigation = useNavigation()
    const [accessToken, setAccessToken] = React.useState<any>(null)
    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: CONFIG_NAMES.GOOGLE_WEB_ID,
        iosClientId: CONFIG_NAMES.GOOGLE_IOS_ID,
        androidClientId: CONFIG_NAMES.GOOGLE_ANDROID_ID
    })

    React.useEffect(() => {
        if (response?.type == 'success') {
            setAccessToken(response?.authentication?.accessToken)

            accessToken && fetchUser()
        }
    }, [response, setAccessToken])

    async function fetchUser() {
        let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })

        const userInfo = await response.json()

        const { success, data } = await socialLogin(dispatch, {
            provider: 'google',
            ...userInfo
        });

        if (success) {
            navigation.navigate(Routes.Home)
        } else {
            console.log(data)
        }
    }

    return (
        <StyledButton onPress={() => promptAsync()}>
            <Image source={require('../assets/google.png')} />
            <StyledText fontWeight={400} fontSize={15}>
                Continuar con Google
            </StyledText>
        </StyledButton>
    )
}

export default GoogleLoginButton
