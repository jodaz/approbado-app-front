import * as React from 'react';
import {
    IconButton,
    DialogTitle as MuiDialogTitle
} from '@material-ui/core';
import { Close } from '../icons';

const DialogTitle = ({ handleClose }) => (
    <MuiDialogTitle style={{ textAlign: 'right' }}>
        {handleClose ? (
        <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
            }}
        >
            <Close />
        </IconButton>
        ) : null}
    </MuiDialogTitle>
)

export default DialogTitle
