import * as React from 'react'
import { Container, Row } from './index';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

const LoadingScreen = () => {
    const theme = useTheme();

    return (
        <Container>
            <Row size={8}>
                <ActivityIndicator size={40} color={theme.palette.info.main}/>
            </Row>
        </Container>
    )
}

export default LoadingScreen
