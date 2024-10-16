import httpClient from "../http-common";

const getCreditos = () => {
    return httpClient.get('/api/v1/credito/');
}

const getCreditosRut = (rut) => {
    return httpClient.get('/api/v1/credito/cliente/${rut}');
}

const simularCredito = (data) => {
    return httpClient.post("/api/v1/credito/calculaSimulacion", data);
}

const getTiposPrestamos = () => {
    return httpClient.get('/api/v1/credito/tipo-prestamo');
}

const create = (data) => {
    return httpClient.post("/api/v1/credito/", data);
}
/*const revisionInicial = (data) => {
    return httpClient.delete(`/api/credito/revisaInicial`);
}
const crearCredito = (data) => {
    return httpClient.post("/api/credito/", data); 
}

const obtenerCredito = (id) => {
    return httpClient.get(`/api/credito/${id}`);
}

const actualizarCredito = (data) => {
    return httpClient.put('/api/credito', data); 
}

const eliminarCredito = (id) => {
    return httpClient.delete(`/api/credito/${id}`);
}*/




export default {
    getCreditos,
    getCreditosRut,
    simularCredito,
    getTiposPrestamos,
    create,
    //obtenerCredito,
    //actualizarCredito,
    //eliminarCredito
};