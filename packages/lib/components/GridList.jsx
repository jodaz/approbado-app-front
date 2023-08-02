import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Spinner from '@approbado/lib/components/Spinner'
import EmptyMessageComponent from '@approbado/lib/components/EmptyMessageComponent'

const LoadedGridList = ({ component, data }) => (
    <Grid container>
        {data.map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
                {React.cloneElement(component, {
                    data: item,
                    index: i
                })}
            </Grid>
        ))}
    </Grid>
);

const GridList = ({ component, empty, data, loaded, error }) => {
    if (!data.length) return <>{empty}</>;

    if (error) return <EmptyMessageComponent
        message='Ha ocurrido un error en su solicitud'
    />;

    return (loaded) ? (
        <LoadedGridList
            component={component}
            empty={empty}
            data={data}
            error={error}
        />
    ) : (
        <Box display="flex">
            <Spinner />
        </Box>
    );
};

GridList.defaultProps = {
    component: <></>,
    empty: <EmptyMessageComponent message='Sin registros' />,
    error: false,
    loaded: true
}

export default GridList;
