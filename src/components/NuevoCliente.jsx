import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import clienteService from "../services/cliente.service";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MenuItem from "@mui/material/MenuItem";
import SaveIcon from "@mui/icons-material/Save";

const NuevoCliente = () => {
  const [rut, setRut] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [edad, setEdad] = useState("");
  const [ingresos, setIngresos] = useState("");
  const [saldo, setSaldo] = useState("");
  const [saldoPositivo, setSaldoPositivo] = useState("");
  const [antiguedadLaboral, setAniguedadLaboral] = useState("");
  const [esMoroso, setEsMoroso] = useState("");
  const [esIndependiente, setEsIndependiente] = useState("");
  const [esEstable, setEsEstable] = useState("");
  const [depositoRegular, setDepositoRegular] = useState("");
  const [deudaTotal, setDeudaTotal] = useState("");
  const [mayorRetiro12, setMayorRetiro12] = useState("");
  const [mayorRetiro6, setMayorRetiro6] = useState("");
  const [tiempoCuentaAhorros, setTiempoCuentaAhorros] = useState("");
  const [totalDepositos, setTotalDepositos] = useState("");
  const { id } = useParams();
  const [titleClienteForm, setTitleClienteForm] = useState("");
  const navigate = useNavigate();

  const guardaCliente = (e) => {
    e.preventDefault();

    const cliente = { rut, nombre, apellidos, edad, ingresos, saldo, saldoPositivo, antiguedadLaboral, 
        esMoroso, esIndependiente, esEstable, depositoRegular, deudaTotal, mayorRetiro12, mayorRetiro6, tiempoCuentaAhorros, totalDepositos, id};
        //Crear nuevo empleado
        clienteService
        .create(cliente)
        .then((response) => {
            console.log("Se ha añadido un nuevo cliente.", response.data);
            navigate("/clientes/inicio");
        })
        .catch((error) => {
            console.log(
            "Ha ocurrido un error al intentar crear nuevo cliente.",
            error
            );
        });
    };

  useEffect(() => {
    setTitleClienteForm("Nuevo Empleado");
}, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      component="form"
    >
      <h3> {titleClienteForm} </h3>
      <hr />
      <form>
        <FormControl fullWidth>
          <TextField
            id="rut"
            label="Rut"
            value={rut}
            variant="standard"
            onChange={(e) => setRut(e.target.value)}
            helperText="Ej. 12.587.698-8"
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="nombre"
            label="Nombre"
            value={nombre}
            variant="standard"
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="apellidos"
            label="Apellidos"
            value={apellidos}
            variant="standard"
            onChange={(e) => setApellidos(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="edad"
            label="Edad"
            type="number"
            value={edad}
            variant="standard"
            onChange={(e) => setEdad(e.target.value)}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            id="ingresos"
            label="Ingresos"
            type="number"
            value={ingresos}
            variant="standard"
            onChange={(e) => setIngresos(e.target.value)}
            helperText="Ingresos mensuales en Pesos Chilenos"
          />
        </FormControl>

        <FormControl component="fieldset">
          <FormLabel component="legend">¿Tiene alguna morosidad?</FormLabel>
          <RadioGroup
            row
            value={esMoroso}
            onChange={(e) => setEsMoroso(e.target.value === "true")}
          >
            <FormControlLabel value="true" control={<Radio />} label="Sí" />
            <FormControlLabel value="false" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>

        <FormControl>
          <br />
          <Button
            variant="contained"
            color="info"
            onClick={(e) => guardaCliente(e)}
            style={{ marginLeft: "0.5rem" }}
            startIcon={<SaveIcon />}
          >
            Grabar
          </Button>
        </FormControl>
      </form>
      <hr />
      <Link to="/clientes/inicio">Volver a la lista de Clientes</Link>
    </Box>
  );
};
export default NuevoCliente;