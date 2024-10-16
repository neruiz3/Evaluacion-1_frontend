import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import documentacionService from "../services/documentacion.service"; // Asegúrate de que la ruta es correcta
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";


const DocumentosClientes = () => {
  const { rut } = useParams();
  const [id, setDocumentId] = useState(null);
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
        console.log(response.data);
        const documento = response.data;
        setDocumentId(documento.id);
        setFormData({
          comprobanteIngresos: documento.comprobanteIngresos ? `data:application/pdf;base64,${documento.comprobanteIngresos}` : null,
          escrituraVivienda: documento.escrituraVivienda ? `data:application/pdf;base64,${documento.escrituraVivienda}` : null,
          historialCrediticio: documento.historialCrediticio ? `data:application/pdf;base64,${documento.historialCrediticio}` : null,
          certificadoAvaluo: documento.certificadoAvaluo ? `data:application/pdf;base64,${documento.certificadoAvaluo}` : null,
          estadoNegocio: documento.estadoNegocio ? `data:application/pdf;base64,${documento.estadoNegocio}` : null,
          planNegocio: documento.planNegocio ? `data:application/pdf;base64,${documento.planNegocio}` : null,
          presupuestoRemodelacion: documento.presupuestoRemodelacion ? `data:application/pdf;base64,${documento.presupuestoRemodelacion}` : null,
          certificadoAntiguedadLaboral: documento.certificadoAntiguedadLaboral ? `data:application/pdf;base64,${documento.certificadoAntiguedadLaboral}` : null,
          informeDeudas: documento.informeDeudas ? `data:application/pdf;base64,${documento.informeDeudas}` : null,
          fotocopiaRut: documento.fotocopiaRut ? `data:application/pdf;base64,${documento.fotocopiaRut}` : null,
          cuentaAhorros: documento.cuentaAhorros ? `data:application/pdf;base64,${documento.cuentaAhorros}` : null,
        });
      } catch (error) {
        console.error("Error al obtener los documentos", error);
      }
    };

    fetchDocumentos();
  }, [rut]);

  const handleChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
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
    // Si hay un ID de documento existente, añade el ID a la petición
    if (id != null) {
      data.append('id', id); // Añadir ID para actualizar el documento
    }
    for (let key in formData) {
      // Verifica si el documento es un archivo antes de agregarlo
      if (formData[key] instanceof File) {
        data.append(key, formData[key], formData[key].name);
        console.log(`Subiendo archivo: ${key}, Nombre: ${formData[key].name}`);
      }
    }
    try {
      const response = id 
      ? await documentacionService.update(data)
      : await documentacionService.create(data);
      console.log('Documentos enviados exitosamente', response.data);
    } catch (error) {
      console.error('Error al enviar los documentos', error);
    }
  };

  const renderFileInput = (label, name, file) => {
    const fileURL = file && typeof file === 'object' ? URL.createObjectURL(file) : file;
  
    return (
      <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
        <Typography variant="h6">{label}</Typography>
        {file ? (
          <iframe
            src={fileURL}
            title={label}
            style={{ width: '100%', height: '400px', border: 'none' }}
          />
        ) : (
          <Typography color="textSecondary">No hay documento subido.</Typography>
        )}
        <input type="file" name={name} onChange={handleChange} style={{ marginTop: "8px" }} />
      </Paper>
    );
  };

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
