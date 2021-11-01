import axios, { AxiosInstance } from 'axios';
import MainConfig from '../../Config/mainConfig';

const port = MainConfig.getInstance().getConfig().serverPort;
const baseURL = `http://localhost:${port}/api/`;
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
}
