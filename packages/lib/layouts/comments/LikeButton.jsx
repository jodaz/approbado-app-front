import * as React from 'react'
import { Heart } from '../../icons';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { likePost } from '@approbado/lib/services/likes.services'

const useStyles = makeStyles(theme => ({
    root: {
        borderRadius: '50%'
    },
    icon: {
        fontSize: '1rem',
        color: props =>
            (props.likeStatus == 1)
                ? 'red'
                : 'inherit'
    }
}));

const LikeButton = ({ id, likeUser }) => {
    const classes = useStyles({ likeStatus: likeUser })
    const [loading, setLoading] = React.useState(false)

    const handleClick = React.useCallback(async () => {
        setLoading(true)

        const { success, data } = await likePost(id)

        if (success) {
            setLoading(false)
        }
    }, [id]);

    return (
        <IconButton
            onClick={handleClick}
            disabled={loading}
            className={classes.root}
        >
            <Heart className={classes.icon} />
        </IconButton>
    )
}

export default LikeButton
