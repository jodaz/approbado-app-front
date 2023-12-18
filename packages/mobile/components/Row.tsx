import styled from 'styled-components/native';
import { IRowProps } from '../types';
import { verticalScale } from '../styles/scaling';

const StyledRow = styled.View`
    margin-top: ${props => verticalScale(props.theme.space[props.size])}px;
    margin-bottom: ${props => verticalScale(props.theme.space[props.size])}px;
    align-items: ${props => props.align};
    justify-content: ${props => props.justify};
    width: 100%;
    flex-direction: ${props => props.direction};
`

const Row = ({ children, ...restProps }: IRowProps) : JSX.Element => (
    <StyledRow {...restProps}>
        {children}
    </StyledRow>
);

Row.defaultProps = {
    size: 1,
    align: 'unset',
    direction: 'column',
    justify: 'unset'
}

export default Row
