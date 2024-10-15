import httpClient from "../http-common";

const create = data => {
    return httpClient.post("/api/v1/documentacion/", data);
}