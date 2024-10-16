import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import creditoService from "../services/credito.service";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AddIcon from "@mui/icons-material/Add";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";


const Creditos = () => {
    const { rut } = useParams();
    const navigate = useNavigate();
    const [creditos, setCreditos] = useState([]);
    
    const buscarCreditos = async () => {
      creditoService
        .getCreditosRut(rut)
        .then((response) => {
          console.log("Mostrando listado de créditos.", response.data);
          setCreditos(response.data || []);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar mostrar listado de todos los empleados.",
            error
          );
        });
    };

    useEffect(() => {
        buscarCreditos();
      }, []);

    const addDocumentos = (rut) => {
        console.log("Printing rut", rut);
        navigate(`/clientes/documentos/${rut}`);
      };
    
    return  (
        <TableContainer component={Paper}>
          <br />
          <Link
            to="/clientes/credito/nuevo/${rut}"
            style={{ textDecoration: "none", marginBottom: "1rem" }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<PersonAddIcon />}
            >
              Solicitar un nuevo crédito
            </Button>
          </Link>
          <br /> <br />
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Rut
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Plazo
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Tasa de interés
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Monto
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Tipo de prestamo
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Valor de la propiedad
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Cuota mensual
                </TableCell>
                <TableCell align="left" sx={{ fontWeight: "bold" }}>
                  Estado
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {creditos.map((credito) => (
                <TableRow
                  key={credito.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">{credito.rut}</TableCell>
                  <TableCell align="left">{credito.plazo}</TableCell>
                  <TableCell align="left">{credito.tasaInteres}</TableCell>
                  <TableCell align="left">{credito.monto}</TableCell>
                  <TableCell align="left">{credito.tipoPrestamo}</TableCell>
                  <TableCell align="left">{credito.valorPropiedad}</TableCell>
                  <TableCell align="left">{credito.cuotaMensual}</TableCell>
                  <TableCell align="left">{credito.estado}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="info"
                      size="small"
                      onClick={() => addDocumentos(cliente.id)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<AddIcon />}
                    >
                      Añadir documentación
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => solicitaCredito(cliente.rut)}
                      style={{ marginLeft: "0.5rem" }}
                      startIcon={<AttachMoneyIcon />}
                    >
                      Mis créditos
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        );
};
export default Creditos;