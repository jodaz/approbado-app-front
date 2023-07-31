import { MenuItem, ListItemIcon } from '@material-ui/core'
import { Settings } from '@approbado/lib/icons'

const OptionMenuItem = ({ icon, name }) => (
    <MenuItem>
        <ListItemIcon>
            {icon}
        </ListItemIcon>
            {name}
    </MenuItem>
)

OptionMenuItem.defaultProps = {
    name: 'Nombre',
    icon: <Settings fontSize="small" />
};

export default OptionMenuItem;
