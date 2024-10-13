import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/clientes/');
}

const create = data => {
    return httpClient.post("/api/v1/clientes/", data);
}

const update = data => {
    return httpClient.put('/api/v1/clientes/', data);
}

const get = id => {
    return httpClient.get(`/api/v1/clientes/${id}`);
}

const getRut = rut => {
    return httpClient.get(`/api/v1/clientes/rut/${rut}`);
}

export default { getAll, create, get, update, getRut};