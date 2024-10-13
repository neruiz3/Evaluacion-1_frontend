import axios from "axios";

const Evaluacion1BackendServer = import.meta.env.EVALUACION1_BACKEND_SERVER;
const Evaluacion1BackendPort = import.meta.env.EVALUACION1_BACKEND_PORT;

console.log(Evaluacion1BackendServer)
console.log(Evaluacion1BackendPort)

export default axios.create({
    baseURL: `http://${Evaluacion1BackendServer}:${Evaluacion1BackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});