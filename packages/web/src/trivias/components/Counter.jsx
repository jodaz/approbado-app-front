import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'
import CountdownFormat from '@approbado/lib/components/CountdownFormat'
import { Watch } from '@approbado/lib/icons'

const Counter = ({ sec }) => (
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
        <CountdownFormat seconds={sec} />
    </Box>
)

Counter.defaultProps = {
    variant: 'success'
}

Counter.propTypes = {
    sec: PropTypes.number
}

export default Counter
