import * as React from 'react';
import PropTypes from 'prop-types';
import { ReactComponent as ActionDelete } from '@approbado/lib/icons/Trash.svg';
import Confirm from '@approbado/lib/layouts/Confirm';
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box';
import { useUiDispatch } from '@approbado/lib/hooks/useUI'
import { JSONAxiosInstance as axios } from '../api';

const DeleteButton = (
    props
) => {
    const {
        basePath,
        confirmTitle = 'ra.message.delete_title',
        confirmContent = 'ra.message.delete_content',
        icon = defaultIcon,
        label,
        record,
        confirmColor,
        customAction
    } = props;
    const [open, setOpen] = React.useState(false);
    const { showNotification } = useUiDispatch();
    const ref = React.useRef(null);

    const handleDialog = () => {
        setOpen(!open);
    };

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/${basePath}/${record.id}`)

            if (res.status >= 200 || res.status < 300) {
                showNotification(`Se ha eliminado el registro con éxito`)

                if (customAction) {
                    customAction();
                }
            }

            handleDialog();
        } catch (error) {
            console.log(error)
            if (error.response.data.errors) {
                return error.response.data.errors;
            }
        }
    }

    return (
        <React.Fragment>
            <MenuItem ref={ref} onClick={handleDialog}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginRight: '10px'
                }}>
                    {icon}
                </Box>
                {label}
            </MenuItem>
            <Confirm
                isOpen={open}
                title={confirmTitle}
                content={confirmContent}
                onConfirm={handleDelete}
                onClose={handleDialog}
                confirmColor={confirmColor}
            />
        </React.Fragment>
    );
};

const defaultIcon = <ActionDelete />;

DeleteButton.propTypes = {
    basePath: PropTypes.string,
    classes: PropTypes.object,
    className: PropTypes.string,
    confirmTitle: PropTypes.string,
    confirmContent: PropTypes.string,
    label: PropTypes.string,
    record: PropTypes.any,
    redirect: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.func,
    ]),
    resource: PropTypes.string,
    icon: PropTypes.element,
    confirmColor: PropTypes.oneOf(['primary', 'warning']),
};

export default DeleteButton;
