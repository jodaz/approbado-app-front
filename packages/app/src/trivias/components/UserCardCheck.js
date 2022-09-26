import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import CheckSolid from '@approbado/lib/icons/CheckSolid'
import TimeIcon from '@approbado/lib/icons/TimeIcon'
import { Link } from 'react-router-dom'

const titleStyles = {
    fontSize: '1.1rem',
    fontWeight: 600,
    lineHeight: '22px',
    marginLeft: '0.5rem',
    flex: 1,
    textDecoration: 'none',
    color: '#000'
}

const UserCardCheck = ({
    user_name,
    status
}) => {
    return (
        <Box sx={{
            backgroundColor: 'black',
            width: '100%',
            height: '1000px',
            maxHeight: '50px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.12)',
            borderRadius: '6px',
            marginBottom: '1rem',
            backgroundColor: '#fff',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center'
        }}>
            <Avatar />
            <Box sx={titleStyles} component={Link} to={`/users/${user_name}`}>{user_name}</Box>
            {status == 'pending' ? <TimeIcon fill='#6D6D6D' /> : <CheckSolid />}
        </Box>
    )
}

export default UserCardCheck
