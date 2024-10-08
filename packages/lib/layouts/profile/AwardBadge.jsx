
import Certificate from '@approbado/lib/icons/Certificate.svg';import Box from '@material-ui/core/Box'
import { alpha } from '@material-ui/core/styles'
import Avatar from '@approbado/lib/components/Avatar';

const AwardBadge = ({
    data: {
        title,
        file,
        type
    },
    id
}) => (
    <Box sx={{
        display: 'flex',
        padding: '1rem',
        flexDirection: 'column',
        width: '10rem',
        height: 'max-content',
        boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.08)',
        background: '#F8F8FC',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: '0.3s',
        borderRadius: '8px',
        '&:hover': {
            background: `${alpha('#F8F8FC', 0.5)}`
        }
    }}
        key={id}
    >
        {(type == 'Insignia') ? (
            <Avatar
                source={file}
                alt='icon'
            />
        ) : (
            <img src={Certificate} alt="My Icon" />
        )}
        <Box padding='1rem'>
            {title}
        </Box>
    </Box>
)

export default AwardBadge
