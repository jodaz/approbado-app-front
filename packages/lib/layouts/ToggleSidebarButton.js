import * as React from 'react';
import {
    Tooltip,
    IconButton,
    styled
} from '@material-ui/core';
import { Menu } from '../icons';
import { useUiState, useUiDispatch } from '../hooks/useUI';

const CustomIconButton = styled(IconButton)(({ theme }) => ({
    color: `${theme.palette.primary.main} !important`,
    marginLeft: '0.5rem'
}));

const ToggleSidebarButton = () => {
    const { sidebarOpen } = useUiState();
    const { toggleSidebar } = useUiDispatch()
    const ref = React.useRef();

    return (
        <Tooltip
            ref={ref}
            title={sidebarOpen ? 'Cerrar menú' : 'Abrir menú'}
            enterDelay={500}
        >
            <CustomIconButton
                onClick={() => toggleSidebar()}
            >
                <Menu />
            </CustomIconButton>
        </Tooltip>
    );
};

export default ToggleSidebarButton;
