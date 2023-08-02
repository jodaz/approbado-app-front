import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import { intervalToDuration } from 'date-fns'
import { Watch } from '@approbado/lib/icons'

const Counter = ({ sec }) => {
    const duration = intervalToDuration({ start: 0, end: sec * 1000 })

    return (
        <Box sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            padding: '1rem 0',
            fontSize: '1.1rem',
            fontWeight: 600,
            alignItems: 'center'
        }}>
            <Box marginRight='1rem'>
                <Watch />
            </Box>
            {`${duration.minutes}:${duration.seconds}`}
        </Box>
    )
}

Counter.defaultProps = {
    variant: 'success'
}

Counter.propTypes = {
    sec: PropTypes.number
}

export default Counter
