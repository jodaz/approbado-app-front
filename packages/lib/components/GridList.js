import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Spinner from '@approbado/lib/components/Spinner'
import EmptyMessageComponent from '@approbado/lib/components/EmptyMessageComponent'

const LoadedGridList = ({ component, empty, data }) => {
    if (!data.length) return <>{empty}</>;

    return (
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
};

const GridList = ({ component, empty, data, loaded }) => {
    return (loaded) ? (
        <LoadedGridList
            component={component}
            empty={empty}
            data={data}
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
    loaded: true
}

export default GridList;
