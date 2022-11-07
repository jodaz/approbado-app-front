import * as React from 'react';
import { useUiState } from '../hooks/useUI';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom'
import { useUserState } from '@approbado/lib/hooks/useUserState';

const Menu = ({ children }) => {
    const { sidebarOpen } = useUiState();
    const { user } = useUserState();

    return (
        <Box mt={1} textAlign="left" padding={sidebarOpen && "0 1rem"}>
            <Box width="80%" height="2rem" margin="1rem">
                {(sidebarOpen) && (
                    <Link to='/'>
                        <img
                            src={`${process.env.PUBLIC_URL}/logotipo_white.png`} alt='approbado_logotipo'
                            height="100%"
                            width="100%"
                        />
                    </Link>
                )}
            </Box>
            {React.Children.map(children, (menuItem) =>
                React.cloneElement(menuItem, {
                    open: sidebarOpen,
                    user: user
                })
            )}
        </Box>
    );
};

export default Menu;
