import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tag from './Tag'

const ItemCollection  = ({ items, label }) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'row'
    }}>
        {items.map((item, i) => (
            <Tag key={i} name={item[label]} />
        ))}
    </Box>
);

ItemCollection.defaultProps = {
    label: 'name'
}

export default ItemCollection
