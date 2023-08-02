import * as React from 'react'
import {
    Datagrid,
    TextField,
    ListBase,
    DateInput,
    useListContext,
    FilterLiveSearch
} from 'react-admin'
import { Form } from 'react-final-form';
import { Download } from '@approbado/lib/icons';
import Box from '@material-ui/core/Box';
import GoToProfileButtonLink from '@approbado/lib/components/GoToProfileButtonLink'
import DatagridListView from '@approbado/lib/components/DatagridListView'
import Button from '@approbado/lib/components/Button'
import download from '@approbado/lib/utils/download';

const FormFilter = props => {
    const {
        filterValues,
        setFilters
    } = useListContext();

    const onSubmit = (values) => {
        if (Object.keys(values).length > 0) {
            setFilters(values);
        }
    };

    return (
        <Form
            onSubmit={onSubmit}
            initialValues={filterValues}
            {...props}
            render={ ({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Box display="flex" alignItems="start" mb={1}>
                        <Box component="span" mr={2}>
                            <FilterLiveSearch label='' source="global_search" />
                        </Box>
                        <Box component="span" mr={2}>
                            <DateInput source="gt_date" label="Desde" />
                        </Box>
                        <Box component="span" mr={2}>
                            <DateInput source="lt_date" label="Hasta" />
                        </Box>
                    </Box>
                </form>
            )}
        />
    );
};

const UsersDatagrid = props => (
    <Datagrid optimized>
        <TextField source="names" label='Nombre' />
        <TextField source="email" label='Correo electrónico' />
        <GoToProfileButtonLink {...props} />
    </Datagrid>
)

const ListActions = props => {
    const [loading, setLoading] = React.useState(false)

    const handleSubmit = React.useCallback(async () => {
        setLoading(true);

        try {
            await download(
                'users/download',
                {},
                'reporte-usuarios-approbado.pdf'
            )
        } catch (error) {
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
        setLoading(false)
    }, [props]);

    return (
        <Box display='flex' justifyContent='space-between' alignItems='center'>
            <FormFilter {...props} />
            <Button icon={<Download />} onClick={handleSubmit} disabled={loading}>
                Descargar
            </Button>
        </Box>
    )
}

const RegisteredUsersList = props => (
    <ListBase
        perPage={15}
        sort={{ field: 'created_at', order: 'ASC' }}
        filter={{ is_registered: true }}
        {...props}
    >
        <DatagridListView actions={<ListActions {...props} />} datagrid={<UsersDatagrid />} />
    </ListBase>
);

RegisteredUsersList.defaultProps = {
    basePath: 'users',
    resource: 'users'
}

export default RegisteredUsersList;
