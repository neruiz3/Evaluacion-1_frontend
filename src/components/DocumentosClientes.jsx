import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import SaveIcon from "@mui/icons-material/Save";
import TextField from "@mui/icons-material/TextField";
import TextField from "@mui/icons-material/TextField";



const tiposDocumentos = [
    "Comprobante de ingresos",
    "Historial crediticio",
    "Escritura de la primera vivienda",
    "Certificado de avalúo",
    "Estado del negocio",
    "Plan de negocio",
    "Presupuesto de remodelación",
  ];

  const DocumentosClientes = () => {
    const [documentoSeleccionado, setDocumentoSeleccionado] = useState("");
    const [archivo, setArchivo] = useState(null);
  
    const handleDocumentoChange = (e) => {
      setDocumentoSeleccionado(e.target.value);
    };
  
    const handleArchivoChange = (e) => {
      setArchivo(e.target.files[0]);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Documento seleccionado:", documentoSeleccionado);
      console.log("Archivo cargado:", archivo);
      // Aquí va la lógica para enviar los archivos al backend
    };
  
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        component="form"
        onSubmit={handleSubmit}
        sx={{ width: "60%", margin: "auto", mt: 4 }}
      >
        <h3>Subir Documentos</h3>
        <hr />
  
        <Grid container spacing={2} alignItems="center">
          {/* Selección del tipo de documento */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <TextField
                select
                label="Tipo de Documento"
                value={documentoSeleccionado}
                onChange={handleDocumentoChange}
                variant="outlined"
                required
              >
                {tiposDocumentos.map((doc, index) => (
                  <MenuItem key={index} value={doc}>
                    {doc}
                  </MenuItem>
                ))}
              </TextField>
            </FormControl>
          </Grid>
  
          {/* Selección del archivo */}
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
              fullWidth
            >
              Seleccionar Archivo
              <input
                type="file"
                hidden
                onChange={handleArchivoChange}
                accept="application/pdf"
              />
            </Button>
            {archivo && <p>{archivo.name}</p>} {/* Muestra el nombre del archivo seleccionado */}
          </Grid>
        </Grid>
  
        {/* Botón de enviar */}
        <Box mt={4} width="100%">
          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            startIcon={<SaveIcon />}
          >
            Enviar Documentos
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default DocumentosClientes;