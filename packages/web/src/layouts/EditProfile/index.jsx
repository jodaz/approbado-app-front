import * as React from 'react'
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { Form } from 'react-final-form'
import { makeStyles } from '@material-ui/core'
import { useUserDispatch, useUserState } from '@approbado/lib/hooks/useUserState'
import { updateProfile } from '@approbado/lib/services/profile.service'
import Grid from '@material-ui/core/Grid'
import ProfileSidebar from '@approbado/lib/layouts/profile/ProfileSidebar'
import TabbedList from '@approbado/lib/components/TabbedList'
import DefaultLayout from '../Default'
import Box from '@material-ui/core/Box'

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

const tags = [
    {
        name: 'Datos personales',
        pathname: '/profile/edit'
    },
    {
        name: 'Inicio de sesión',
        pathname: '/profile/sessions'
    },
    {
        name: 'Planes',
        pathname: '/profile/plans'
    }
]

const EditProfileLayout = ({ children }) => {
    const classes = useStyles();
    const { user, isAuth } = useUserState();
    const { showNotification } = useUiDispatch();
    const { fetchUser } = useUserDispatch();

    const handleSubmit = React.useCallback(async ({ file, ...restValues }) => {
        setLoading(true)
        const values = {
            file: file.rawFile,
            ...restValues
        };

        const { data, success } = await updateProfile(values)

        if (success) {
            setLoading(false)
            fetchUser();
            showNotification(`Su perfil ha sido actualizado.`)
        } else {
            setLoading(false)
            return data;
        }
    }, []);

    if (!isAuth) return null;

    return (
        <DefaultLayout>
            <Box marginTop='2rem'>
                <Form
                    onSubmit={handleSubmit}
                    initialValues={user}
                    render={({ handleSubmit, submitting }) => (
                        <form onSubmit={handleSubmit} noValidate>
                            <Grid container className={classes.root}>
                                <Grid item md='3' sm='12'>
                                    <ProfileSidebar {...user} />
                                </Grid>
                                <span style={{ width: '4rem'}} />
                                <Grid item md='8' sm='12'>
                                    <TabbedList tags={tags} />
                                    {React.Children.map(children, child => {
                                        if (React.isValidElement(child)) {
                                            return React.cloneElement(child, {
                                                user: user,
                                                submitting: submitting,
                                                handleSubmit: handleSubmit
                                            })
                                        }
                                    })}
                                </Grid>
                            </Grid>
                        </form>
                    )}
                />
            </Box>
        </DefaultLayout>
    )
}

export default EditProfileLayout
