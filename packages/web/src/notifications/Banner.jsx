import * as React from 'react';
import Box from '@material-ui/core/Box';
import BannerIllustration from '@approbado/lib/illustrations/Banner.svg';
import { usePlan } from '@approbado/lib/hooks/useUserState';
import { useHistory } from 'react-router-dom'

const AsideBar = () => {
    const { found: isFreeMembership} = usePlan('Free');
    const history = useHistory()

    return isFreeMembership && (
        <Box p='0 0 0 2rem'>
            <img src={BannerIllustration} alt='banner' />
        </Box>
    );
}

export default AsideBar
