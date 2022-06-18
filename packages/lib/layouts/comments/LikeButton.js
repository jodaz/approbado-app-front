import * as React from 'react'
import LikeIcon from '@approbado/lib/icons/LikeIcon'
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { axios } from '@approbado/lib/providers'

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

        try {
            const res = await axios.put(`/like-posts/${id}`, {})

            console.log(res)
        }  catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
        setLoading(false)
    }, [id]);

    return (
        <IconButton
            onClick={handleClick}
            disabled={loading}
            className={classes.root}
        >
            <LikeIcon className={classes.icon} />
        </IconButton>
    )
}

export default LikeButton
