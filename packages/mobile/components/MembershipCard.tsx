import styled from 'styled-components/native';
import Row from './Row';
import Text from './Text';

const Container = styled.View`
    margin-top: ${props => props.theme.space[props.size]};
    margin-bottom: ${props => props.theme.space[props.size]};
    width: 100%;
    align-items: ${props => props.align};
    justify-content: ${props => props.justify};
    flex-direction: ${props => props.direction};
    padding: ${props => props.theme.space[4]};
    border-radius: 6px;
`

const MembershipCard = () : JSX.Element => (
    <Container>
        <Row size={1}>
            <Text>
                TU PLAN
            </Text>
        </Row>
        <Row size={1}>
            <Text
                fontWeight={700}
                fontSize={24}
            >
                Approbado Free
            </Text>
        </Row>
        <Row size={1}>
            <Text
                fontWeight={400}
                fontSize={16}
            >
                Actualmente tienes una cuenta free, cambiate a premium y obtén más beneficios 😄
            </Text>
        </Row>
    </Container>
);

MembershipCard.defaultProps = {
    size: 1,
    align: 'unset',
    direction: 'column',
    justify: 'unset'
}

export default MembershipCard
