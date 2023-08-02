import * as React from 'react';
import { Close } from '@approbado/lib/icons'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom'

export default function CustomizedDialogs() {
    const history = useHistory();
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const { trivia_id, subtheme_id } = useParams();
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button color="primary" onClick={handleClickOpen}>
                Agregar preguntas
            </Button>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        style={{ float: 'right' }}
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6" gutterBottom>
                        Agregar preguntas
                    </Typography>
                    <Typography gutterBottom>
                        Selecciona la forma en la que deseas agregar las preguntas
                    </Typography>
                    <Box
                        display="flex"
                        justifyContent="space-evenly"
                        flexDirection="column"
                        height="8rem"
                    >
                        <Button
                            variant="outlined"
                            onClick={() => history.push(`/trivias/${trivia_id}/subthemes/${subtheme_id}/questions/upload`)}
                        >
                            Subir de forma masiva
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => history.push(`/trivias/${trivia_id}/subthemes/${subtheme_id}/questions/create`)}
                        >
                            Agregar una pregunta
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
        </div>
    );
}
