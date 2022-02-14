import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

interface IModal {
  open: boolean;
  edit: boolean;
  handleClose: () => void;
  handleAction: (nombre: any, apellido: any, edad: any) => void;
}

export const Modal = ({ open, edit, handleClose, handleAction }: IModal) => {
  const [nombre, setName] = React.useState("");
  const [apellido, setLastname] = React.useState("");
  const [edad, setEdad] = React.useState(0);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Ingrese los datos del usuario</DialogTitle>
        <DialogContent>
          <TextField
            id="standard-basic"
            label="Nombre"
            variant="standard"
            onChange={(event) => setName(event.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Apellido"
            variant="standard"
            onChange={(event) => setLastname(event.target.value)}
          />
          <TextField
            id="standard-basic"
            label="Edad"
            variant="standard"
            onChange={(event) => setEdad(parseInt(event.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleAction(nombre, apellido, edad)}>
            {edit ? "Editar" : "Agregar"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
