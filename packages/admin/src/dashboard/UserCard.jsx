import * as React from 'react';
import Avatar from '@approbado/lib/components/Avatar'
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'
import isEmpty from 'is-empty'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
    root: {
        margin: '1em',
        radius: '8px',
        background: '#F9F9F9',
        cursor: 'pointer'
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        marginRight: '1rem'
    },
    cardContent: {
        padding: '1em',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    innerContent: {
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'column',
        alignItems: 'start'
    },
    position: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '0.5rem'
    }
}))

const PositionIcon = ({ pos }) =>{
    const [icon, setIcon] = React.useState('')

    React.useState(() => {
        if (pos == 1) {
            setIcon('golden_cup')
        } else if (pos == 2) {
            setIcon('silver_cup')
        } else if (pos == 3) {
            setIcon('bronze_cup')
        }
    }, []);

    return (
        <img
            src={`${process.env.PUBLIC_URL}/${icon}.png`}
            alt={`${icon}`}
            style={{ marginRight: '0.5rem'}}
        />
    )
}

const UserCard = ({ data, index }) => {
    const classes = useStyles();
    const position = index + 1
    const history = useHistory();

    const handleClick = () => history.push(`/${data.user_name}`)

    return (
        <Card className={classes.root} onClick={handleClick}>
            <CardContent className={classes.cardContent}>
                <Avatar
                    className={classes.avatar}
                    source={data.picture}
                    alt='photo_profile'
                />
                <div className={classes.innerContent}>
                    <Typography variant="h5" component="p">
                        {data.names}
                    </Typography>
                    <div className={classes.position}>
                        { (position < 4) && (
                            <PositionIcon pos={position} />
                        )}
                        <Typography variant="subtitle2" component="span">
                            {position}º Lugar · {!isEmpty(data.profile) && data.profile.points} ptos
                        </Typography>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

UserCard.propTypes = {
    data: PropTypes.object,
    id: PropTypes.number
}

export default UserCard
