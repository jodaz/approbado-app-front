import * as React from 'react';
import Box from '@material-ui/core/Box';
import Tag from './Tag'

const ItemCollection  = ({ items, label, color, icon }) => (
    <Box sx={{
        display: 'flex',
        justifyContent: 'start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }}>
        {items.map((item, i) => (
            <Tag key={i} name={item[label]} color={color} icon={icon} />
        ))}
    </Box>
);

ItemCollection.defaultProps = {
    label: 'name',
}

export default ItemCollection
