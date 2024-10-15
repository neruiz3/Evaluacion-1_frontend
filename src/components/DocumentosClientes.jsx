import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        const response = await documentacionService.getByRut(rut);
        const documento = response.data;
        setFormData({
          comprobanteIngresos: convertirBlob(documento.comprobanteIngresos),
          escrituraVivienda: convertirBlob(documento.escrituraVivienda),
          historialCrediticio: convertirBlob(documento.historialCrediticio),
          certificadoAvaluo: convertirBlob(documento.certificadoAvaluo),
          estadoNegocio: convertirBlob(documento.estadoNegocio),
          planNegocio: convertirBlob(documento.planNegocio),
          presupuestoRemodelacion: convertirBlob(documento.presupuestoRemodelacion),
          certificadoAntiguedadLaboral: convertirBlob(documento.certificadoAntiguedadLaboral),
          informeDeudas: convertirBlob(documento.informeDeudas),
          fotocopiaRut: convertirBlob(documento.fotocopiaRut),
          cuentaAhorros: convertirBlob(documento.cuentaAhorros),
        });
      } catch (error) {
              console.error("Error al obtener los documentos", error);
          }
    };

    fetchDocumentos();
  }, [rut]);

  const convertirBlob = (data) => {
    if (!data) return null;
    return new Blob([new Uint8Array(data)], { type: 'application/pdf' });
  };

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
  
      // Verifica que sea un PDF
      if (file.type !== 'application/pdf') {
        alert('Por favor, sube un archivo PDF válido.');
        return;
      }
      setFormData({ ...formData, [name]: file });
    }
  };

  const guardaDocumentacion = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('rut', rut);
    for (let key in formData) {
      if (formData[key]) {
        data.append(key, formData[key], formData[key].name);
      }
    }

    try {
      const response = await documentacionService.create(data);
      console.log('Documentos enviados exitosamente', response.data);
    } catch (error) {
      console.error('Error al enviar los documentos', error);
    }
  };

  const renderFileInput = (label, name, file) => (
    <Paper elevation={3} style={{ padding: '16px', marginBottom: '16px' }}>
      <Typography variant="h6">{label}</Typography>
      {file && (
        <div>
          <Typography variant="body2">Archivo existente: {file.name || 'documento.pdf'}</Typography>
          {/* Enlace para abrir el PDF en una nueva pestaña */}
          <a href={URL.createObjectURL(file)} target="_blank" rel="noopener noreferrer">Ver PDF</a>
        </div>
      )}
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
      {renderFileInput('Comprobante de Ingresos', 'comprobanteIngresos', formData.comprobanteIngresos)}
        {renderFileInput('Escritura Primera Vivienda', 'escrituraVivienda', formData.escrituraVivienda)}
        {renderFileInput('Historial Crediticio', 'historialCrediticio', formData.historialCrediticio)}
        {renderFileInput('Certificado de Avalúo', 'certificadoAvaluo', formData.certificadoAvaluo)}
        {renderFileInput('Estado Financiero del Negocio', 'estadoNegocio', formData.estadoNegocio)}
        {renderFileInput('Plan de Negocios', 'planNegocio', formData.planNegocio)}
        {renderFileInput('Presupuesto de la Remodelación', 'presupuestoRemodelacion', formData.presupuestoRemodelacion)}
        {renderFileInput('Certificado de Antigüedad Laboral', 'certificadoAntiguedadLaboral', formData.certificadoAntiguedadLaboral)}
        {renderFileInput('Informe de Deudas', 'informeDeudas', formData.informeDeudas)}
        {renderFileInput('Fotocopia del RUT', 'fotocopiaRut', formData.fotocopiaRut)}
        {renderFileInput('Resumen anual de la Cuenta de Ahorros', 'cuentaAhorros', formData.cuentaAhorros)}
        <Divider style={{ margin: '24px 0' }} />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Subir Documentos
        </Button>
      </form>
    </Container>
  );
};
export default DocumentosClientes;
