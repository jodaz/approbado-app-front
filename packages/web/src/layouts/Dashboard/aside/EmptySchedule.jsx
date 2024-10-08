import Box from '@material-ui/core/Box';
import EventIllustration from '@approbado/lib/illustrations/Event.svg';
import NoContent from '@approbado/lib/components/NoContent'
import Link from '@material-ui/core/Link'
import DefaultLinkBehavior from '@approbado/lib/components/LinkBehavior';
import { styled, alpha } from '@material-ui/core';

const LinkBehavior = styled(DefaultLinkBehavior)(({ theme }) => ({
    'color': theme.palette.info.main,
    'transition': '0.2s',
    'textDecoration': 'underline',
    '&:hover': {
        color: alpha(theme.palette.info.main, 0.8)
    }
}));

const EmptySchedule = () => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '30rem',
        flexDirection: 'column'
    }}>
        <NoContent icon={<img src={EventIllustration} />} title='No tiene eventos.' />
        <Link to='/?tab=calendar' component={LinkBehavior}>Crear uno</Link>
    </Box>
);

export default EmptySchedule
