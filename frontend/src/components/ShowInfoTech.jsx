import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ShowInfoTech = ({item}) => {
    const [open, setOpen] = React.useState(false);
    const [arreglo, setArreglo] = React.useState(item.concidencias);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Button size="small" variant="outlined" onClick={handleClickOpen}>
                Mostrar más detalles
            </Button>
            <Dialog
                open={open}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{item.tituo}</DialogTitle>
                <DialogContent>
                        {arreglo.map((el, index) => {
                            return (
                            <DialogContentText key={index}>
                                {el[0] + ": " + el[1]}
                            </DialogContentText>)
                            
                        })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Aceptar</Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}


export {ShowInfoTech}