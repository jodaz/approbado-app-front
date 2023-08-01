import * as React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import NoContent from '@approbado/lib/components/NoContent'
import { ReactComponent as QuizzIllustration } from '@approbado/lib/illustrations/Quiz.svg'
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@approbado/lib/icons'

const SuccessDialog = ({ open, handleClose, title, ...rest }) => (
    <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        {...rest}
    >
        <Box sx={{
            display: 'flex',
            justifyContent: 'end'
        }}>
            <IconButton
                aria-label="close"
                onClick={handleClose}
                unresponsive
            >
                <Close />
            </IconButton>
        </Box>
        <DialogContent>
            <NoContent
                icon={<QuizzIllustration />}
                title={
                    <Box sx={{
                        textAlign: 'center',
                        color: '#000000',
                        width: '20rem',
                        padding: '1rem'
                    }}>
                        <Box sx={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1rem' }}>
                            {title}
                        </Box>
                        <Box sx={{ fontSize: '1rem', fontWeight: 500 }}>
                            Felicidades! Diviertete realizando las increíbles trivias que tenemos para ti
                        </Box>
                    </Box>
                }
            />
        </DialogContent>
    </Dialog>
);

SuccessDialog.defaultProps = {
    children: <></>,
    title: 'Acabas de crear una trivia'
}

export default SuccessDialog
