import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import employeeService from "../services/employee.service";
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
    return (
      <div>
        <h1>Clientes</h1>
      </div>
      
    );
  };
  
  export default InicioClientes;