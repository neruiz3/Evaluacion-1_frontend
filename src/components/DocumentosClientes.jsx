import React, { useState } from "react";
import { useParams } from "react-router-dom";
import documentacionService from "../services/documentacion.service"; // Asegúrate de que la ruta es correcta

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

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Añadir Documentos para el Cliente con RUT: {rut}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" alignItems="stretch" gap={3}>
          <Typography variant="h6">Comprobante de Ingresos</Typography>
          <input type="file" name="comprobanteIngresos" onChange={handleChange} />

          <Typography variant="h6">Escritura Primera Vivienda</Typography>
          <input type="file" name="escrituraVivienda" onChange={handleChange} />

          <Typography variant="h6">Historial Crediticio</Typography>
          <input type="file" name="historialCrediticio" onChange={handleChange} />

          <Typography variant="h6">Certificado de Avalúo</Typography>
          <input type="file" name="certificadoAvaluo" onChange={handleChange} />

          <Typography variant="h6">Estado Financiero del Negocio</Typography>
          <input type="file" name="estadoNegocio" onChange={handleChange} />

          <Typography variant="h6">Plan de Negocios</Typography>
          <input type="file" name="planNegocio" onChange={handleChange} />

          <Typography variant="h6">Presupuesto de la Remodelación</Typography>
          <input type="file" name="presupuestoRemodelacion" onChange={handleChange} />

          <Button variant="contained" color="primary" type="submit" fullWidth>
            Enviar Documentos
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default DocumentosClientes;
