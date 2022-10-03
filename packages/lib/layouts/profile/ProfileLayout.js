import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'
import ProfileSidebar from './ProfileSidebar'
import TabbedList from '@approbado/lib/components/TabbedList'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
            alignItems: 'start'
        }
    }
}));

const tags = id => ([
    {
        name: 'Sobre mí',
        pathname: `/${id}/about`
    },
    {
        name: 'Publicaciones',
        pathname: `/${id}/publications`
    },
    {
        name: 'Certificaciones',
        pathname: `/${id}/certifications`
    }
])

const Profile = ({ data, children }) => {
    const { user_name } = data
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid item md='3' sm='12'>
                <ProfileSidebar {...data} />
            </Grid>
            <span style={{ width: '4rem'}} />
            <Grid item md='8' sm='12'>
                <TabbedList tags={tags(user_name)} />
                {
                    React.Children.map(children, (child) =>
                        React.cloneElement(child, {
                            data: data
                        })
                    )
                }
            </Grid>
        </Grid>
    );
}

export default Profile
