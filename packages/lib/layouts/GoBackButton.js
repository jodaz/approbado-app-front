import * as React from 'react';
import {
    Tooltip,
    IconButton,
    styled
} from '@material-ui/core';
import LeftAngleIcon from '@approbado/lib/icons/LeftAngleIcon'
import { useTriviaDispatch } from '@approbado/lib/hooks/useTriviaSelect'
import { useHistory, useRouteMatch } from 'react-router-dom'

const CustomIconButton = styled(IconButton)(({ theme }) => ({
    color: `${theme.palette.primary.main} !important`,
}));

const ToggleSidebarButton = () => {
    const { unsetTrivia } = useTriviaDispatch();
    const history = useHistory();
    const isPlaying = useRouteMatch("/game");

    const handleGoHome = () => {
        if (isPlaying) {
            unsetTrivia();
        }
        history.goBack();
    }

    return (
        <Tooltip
            title='Regresar'
            enterDelay={500}
        >
            <CustomIconButton onClick={handleGoHome}>
                <LeftAngleIcon />
            </CustomIconButton>
        </Tooltip>
    );
};

export default ToggleSidebarButton;
