import styled from "styled-components/native";
import { Button, Row } from "../../../components";
import BroGaming from '@approbado/lib/illustrations/BroGaming.svg'

const Container = styled.View`
    align-items: center;
    width: 100%;
`

const QuickTrivia = () => {
    return (
        <Container>
            <Row size={1} align="center">
                <BroGaming />
            </Row>
            <Row size={1} align="center">
                <Button fullWidth>
                    Trivia rápida
                </Button>
            </Row>
        </Container>
    )
}

export default QuickTrivia
