import axios, { AxiosInstance } from 'axios';
import AxiosHandler from '../Infrastructure/AxiosHandler';

const baseURL = 'http://localhost:8080/api/';
const timeout = 3000;
const headersPublic = {
    'Content-Type': 'application/json',
    'Accept': '*/*'
};
const headersPrivate = {
    'Content-Type': 'application/json',
    'Accept': '*/*',
    'Authentication': ''
};

export class AxiosFactory
{
    static getAxiosInstance(isPrivate = true): AxiosInstance
    {
        let config = { baseURL, timeout, headers: headersPrivate };

        if (!isPrivate)
        {
            // @ts-ignore
            config = { baseURL, timeout, headers: headersPublic };
        }

        return axios.create(config);
    }
    static getAxiosHandlerInstance(): AxiosHandler
    {
        return new AxiosHandler(axios.create());
    }
}

export default AxiosFactory;
