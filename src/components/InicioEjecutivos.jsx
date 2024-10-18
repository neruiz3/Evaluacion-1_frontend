import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import creditoService from "../services/credito.service";
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
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CalculateIcon from "@mui/icons-material/Calculate";


const InicioEjecutivos = () => {
    const [creditos, setCreditos] = useState([]);
    const navigate = useNavigate();
  
    const init = () => {
      creditoService
        .getCreditos()
        .then((response) => {
          console.log("Mostrando listado de todos los creditos.", response.data);
          setCreditos(response.data || []);
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar mostrar listado de todos los creditos.",
            error
          );
        });
    };
  
    useEffect(() => {
      init();
    }, []);

    const visualizaInfo = (id) => {
      navigate(`/ejecutivos/credito-info/${id}`);
    };

    const elimina = (id) => {
        creditoService
        .remove(id)
        .then((response) => {
            console.log("Solicitud eliminada de la lista.", response.data);
            init();
          })
          .catch((error) => {
            console.log(
              "No se ha podido eliminar.",
              error
            );
          });
      };
  

    const compruebaDocs = (credito) => {
        creditoService
        .revisionInicial(credito)
        .then((response) => {
          console.log("Revisando documentos.", response.data);
          init();
        })
        .catch((error) => {
          console.log(
            "Se ha producido un error al intentar revisar la documentación.",
            error
          );
        });
      };

    return (
    <TableContainer component={Paper}>
      <br />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Rut del Cliente
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Tipo de préstamo
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Estado de solicitud
            </TableCell>
            <TableCell align="left" sx={{ fontWeight: "bold" }}>
              Operaciones
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
              <TableCell align="left">{credito.tipoPrestamo}</TableCell>
              <TableCell align="left">{credito.estado}</TableCell>
              
                {credito.estado === "EN_EVALUACION" && (
                <TableCell>
                <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => visualizaInfo(credito.id)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<AddIcon />}
                    >
                    Evaluar
                </Button>
                </TableCell>
                )}
                {credito.estado === "EN_REVISION_INICIAL" && (
                        <TableCell>
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={() => compruebaDocs(credito)}
                            style={{ marginLeft: "0.5rem" }}
                            startIcon={<CheckIcon />}
                        >
                            Checkea documentacion
                        </Button>
                        </TableCell>
                        )}
                {credito.estado === "CANCELADA_POR_CLIENTE" && (
                <TableCell>
                    <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => elimina(credito.id)}
                    style={{ marginLeft: "0.5rem" }}
                    startIcon={<CheckIcon />}
                    >
                    Eliminar solicitud
                    </Button>
                </TableCell>
                )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    );
}; 

export default InicioEjecutivos;