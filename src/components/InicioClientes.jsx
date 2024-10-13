import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import clienteService from "../services/cliente.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


const InicioClientes = () => {
    const [clientes, setClientes] = useState([]);
  
    //const navigate = useNavigate();
  
    const init = () => {
      clienteService
        .getAll()
        .then((response) => {
          console.log("Mostrando listado de todos los empleados.", response.data);
          setClientes(response.data);
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar mostrar listado de todos los empleados.",
            error
          );
        });
    };
  
    useEffect(() => {
      init();
    }, []);
    return (
        <p1>Clientes</p1>
    );
}; 

export default InicioClientes;