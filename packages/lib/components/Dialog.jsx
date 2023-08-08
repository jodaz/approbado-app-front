import * as React from 'react';
import {
    makeStyles,
    DialogContent,
    Dialog as MuiDialog,
    Backdrop
} from '@material-ui/core/';

const useStyles = makeStyles(() => ({
    root: {
        border: '0 !important',
        borderRadius: '6px !important'
    }
}));

const CustomBackdrop = () => <Backdrop invisible />

Dialog.defaultProps = {
    children: <></>,
    title: <></>
}

export default function Dialog({ open, handleClose, children, backdrop, title, ...rest }) {
    const classes = useStyles();

    return (
        <MuiDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            className={classes.root}
            BackdropComponent={CustomBackdrop}
            {...rest}
        >
            {React.cloneElement(title, {})}
            <DialogContent>
                {children}
            </DialogContent>
        </MuiDialog>
    );
}
