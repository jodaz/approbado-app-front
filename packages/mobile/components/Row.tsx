import styled from 'styled-components/native';
import { IRowProps } from '../types';
import { verticalScale } from '../styles/scaling';

const defaultProps = {
    size: 1,
    align: 'unset',
    direction: 'column',
    justify: 'unset'
}

const StyledRow = styled.View`
    margin-vertical: ${props => verticalScale(props.theme.space[props.size])}px;
    align-items: ${props => props.align};
    justify-content: ${props => props.justify};
    flex-direction: ${props => props.direction};
`

const Row = ({ children, ...restProps }: IRowProps) : JSX.Element => (
    <StyledRow {...defaultProps} {...restProps}>
        {children}
    </StyledRow>
);

export default Row
