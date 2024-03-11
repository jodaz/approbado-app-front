import * as React from 'react';
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardButton from './CardButton'
import TopUsersList from './TopUsersList'
import { listTrivias } from '@approbado/lib/services/trivias.services'
import { listUsers } from '@approbado/lib/services/users.services'
import { listMemberships } from '@approbado/lib/services/memberships.services';

const initialState = {
    'users': {
        title: 'Usuarios registrados',
        loading: true,
        total: 0,
        linkText: 'Ver usuarios',
        link: '/users'
    },
    'memberships': {
        title: 'Membresías activas',
        loading: true,
        total: 0,
        linkText: 'Ver usuarios suscritos',
        link: '/users'
    },
    'trivias': {
        title: 'Trivias publicadas',
        loading: true,
        total: 0,
        linkText: 'Editar trivias',
        link: '/trivias'
    },
};

const AdminDashboard = () => {
    const [state, setState] = React.useState(initialState);

    const fetchUsers = React.useCallback(async () => {
        const { success, count } = await listUsers({
            filter: {
                is_registered: true
            }
        })

        if (success) {
            setState(state => ({
                ...state,
                users: {
                    ...state.users,
                    loading: false,
                    total: count
                }
            }));
        }
    }, []);

    const fetchTrivias = React.useCallback(async () => {
        const { success, count } = await listTrivias()

        if (success) {
            setState(state => ({
                ...state,
                trivias: {
                    ...state.trivias,
                    loading: false,
                    total: count
                }
            }));
        }
    }, []);

    const fetchMemberships = React.useCallback(async () => {
        const { success, count } = await listMemberships()

        if (success) {
            setState(state => ({
                ...state,
                memberships: {
                    ...state.memberships,
                    loading: false,
                    total: count
                }
            }));
        }
    }, []);

    React.useEffect(() => {
        fetchUsers();
        fetchMemberships();
        fetchTrivias();
    }, []);

    const { trivias, users, memberships } = state;

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid item sm={12}>
                    <Typography component='h3' variant={'h6'}>
                        Resumen
                    </Typography>
                </Grid>
                <Grid container>
                    <Grid item xs={12} md={4}>
                        <CardButton {...users} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CardButton {...memberships} />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <CardButton {...trivias} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <TopUsersList />
            </Grid>
        </Grid>
    )
}

export default AdminDashboard
