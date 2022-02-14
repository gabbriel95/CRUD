import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Axios } from "../../services/axios";
import Button from "@mui/material/Button";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";

import { Modal } from "../../src/components/user.modal";

const theme = createTheme({
  palette: {
    primary: {
      main: red[500],
    },
  },
});

interface User {
  dni: number;
  nombre: string;
  apellido: string;
  edad: number;
}

export default function BasicTable() {
  const [users, setUsers] = React.useState<User[]>([]);
  const [name, setName] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [edad, setEdad] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [edit, setEdit] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    getUserList();
  }, []);

  const getUserList = () => {
    Axios.getUsers()
      .then((data) => {
        console.log("DATA: ", data);
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCreateUser = () => {
    const user2: any = {
      nombre: name,
      apellido: lastname,
      edad,
    };
    Axios.createUser(user2)
      .then((data) => {
        getUserList();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const modifyUser = (dni: number) => {
    const user2: any = {
      nombre: name,
      apellido: lastname,
      edad,
    };
    console.log(`Intentando modificar el usuario con id ${dni}`);
    console.log(user2);
    /*Axios.modifyUser(dni, user2)
      .then((data) => {
        getUserList();
      })
      .catch((err) => {
        console.log(err);
      });*/
  };

  const deleteUser = (dni: number) => {
    Axios.delate(dni)
      .then((data) => {
        getUserList();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Edad</TableCell>
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Editar/Borrar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.dni}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.nombre}
                </TableCell>
                <TableCell align="right">{row.apellido}</TableCell>
                <TableCell align="right">{row.edad}</TableCell>
                <TableCell align="right">{row.dni}</TableCell>
                <TableCell align="right">
                  {" "}
                  <ThemeProvider theme={theme}>
                    <Button
                      variant="contained"
                      onClick={() => deleteUser(row.dni)}
                    >
                      Borrar
                    </Button>
                  </ThemeProvider>
                  <Button variant="contained" onClick={handleClickOpen}>
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "50px",
          width: "100%",
        }}
      >
        <Button variant="contained" onClick={handleClickOpen}>
          Agregar usuario
        </Button>
      </div>
      <Modal
        open={open}
        edit={edit}
        handleClose={handleClose}
        handleAction={edit ? () => modifyUser : handleCreateUser}
      />
    </>
  );
}
