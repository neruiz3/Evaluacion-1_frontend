import httpClient from "../http-common";

const create = (data) => {
    const headers = {
      "Content-Type": "multipart/form-data",
    };
  
    return httpClient.post("/api/v1/documentacion/", data, { headers });
  };
  
  export default { create };