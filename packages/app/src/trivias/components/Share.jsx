import * as React from 'react'
import Box from '@material-ui/core/Box'
import makeStyles from '@material-ui/styles/makeStyles'
import { ReactComponent as LinkedinIcon } from '@approbado/lib/icons/Linkedin.svg'
import { ReactComponent as TwitterIcon } from '@approbado/lib/icons/Twitter.svg'
import { ReactComponent as FacebookIcon } from '@approbado/lib/icons/FacebookIconOutline.svg'
import ShareIcon from '@approbado/lib/icons/ShareIcon'

const useStyles = makeStyles(theme => ({
    root: {
        position: 'absolute',
        top: '20%',
        right: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 700,
        [theme.breakpoints.down('sm')]: {
            right: '25px'
        }
    },
    socialIcons: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
            marginTop: '1rem',
            height: '2rem',
            width: '2rem',
        }
    }
}))

const Share = () => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            Compartir
            <Box className={classes.socialIcons}>
                <LinkedinIcon />
                <TwitterIcon />
                <FacebookIcon />
                <ShareIcon />
            </Box>
        </Box>
    )
}

export default Share
