import React, { useState } from "react";
import { useParams } from "react-router-dom";
import documentacionService from "../services/documentacion.service"; // Asegúrate de que la ruta es correcta
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";


const DocumentosClientes= () => {
  const { rut } = useParams();
  const [formData, setFormData] = useState({
    comprobanteIngresos: null,
    escrituraVivienda: null,
    historialCrediticio: null,
    certificadoAvaluo: null,
    estadoNegocio: null,
    planNegocio: null,
    presupuestoRemodelacion: null,
    certificadoAntiguedadLaboral: null,
    informeDeudas: null,
    fotocopiaRut: null,
    cuentaAhorros: null
  });

  const handleChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const guardaDocumentacion = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('rut', rut);
    for (let key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await documentacionService.create(data);
      console.log('Documentos enviados exitosamente', response.data);
    } catch (error) {
      console.error('Error al enviar los documentos', error);
    }
  };

  const renderFileInput = (label, name) => (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="h6">{label}</Typography>
      <input type="file" name={name} onChange={handleChange} />
    </Paper>
  );


  return (
    <Container maxWidth="md">
      <Typography variant="h6" align="center" gutterBottom>
        <br></br>
        Añadir Documentos para el Cliente con RUT: {rut}
        <br></br>
      </Typography>
      <form onSubmit={guardaDocumentacion}>
        {renderFileInput('Comprobante de Ingresos', 'comprobanteIngresos')}
        {renderFileInput('Escritura Primera Vivienda', 'escrituraVivienda')}
        {renderFileInput('Historial Crediticio', 'historialCrediticio')}
        {renderFileInput('Certificado de Avalúo', 'certificadoAvaluo')}
        {renderFileInput('Estado Financiero del Negocio', 'estadoNegocio')}
        {renderFileInput('Plan de Negocios', 'planNegocio')}
        {renderFileInput('Presupuesto de la Remodelación', 'presupuestoRemodelacion')}
        {renderFileInput('Certificado de Antigüedad Laboral', 'certificadoAntiguedadLaboral')}
        {renderFileInput('Informe de Deudas', 'informeDeudas')}
        {renderFileInput('Fotocopia del RUT', 'fotocopiaRut')}
        {renderFileInput('Resumen anual de la Cuenta de Ahorros', 'cuentaAhorros')}
        <Divider style={{ margin: '24px 0' }} />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Enviar Documentos
        </Button>
      </form>
    </Container>
  );
};

export default DocumentosClientes;
