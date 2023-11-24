import styled from 'styled-components/native';
import { IRowProps } from '../types';

const StyledRow = styled.View`
    margin-top: ${props => props.theme.space[props.size]};
    margin-bottom: ${props => props.theme.space[props.size]};
    width: 100%;
    align-items: ${props => props.align};
    justify-content: ${props => props.justify};
    flex-direction: row;
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
