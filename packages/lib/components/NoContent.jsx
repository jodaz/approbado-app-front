import React from 'react'
import Box from '@material-ui/core/Box'
import PropTypes from 'prop-types'

const NoContent = ({ icon, title }) => (
    <Box sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 'inherit'
    }}>
        <img src={icon} title={title} />
        <Box>
            {title}
        </Box>
    </Box>
);

NoContent.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    icon: PropTypes.element
}

NoContent.defaultProps = {
    icon: <></>
}

export default NoContent;
