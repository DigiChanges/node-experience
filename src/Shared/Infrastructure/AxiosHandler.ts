import { AxiosInstance, AxiosResponse } from 'axios';
import Logger from '../Helpers/Logger';

interface AxiosSendPayload
{
    method: string,
    url: string,
    data?: any,
    config: any
}

class AxiosHandler
{
    private axios: AxiosInstance;

    constructor(axios: AxiosInstance)
    {
        this.axios = axios;
    }

    public async send(payload: AxiosSendPayload)
    {
        try
        {
            const { method, url, data, config } = payload;

            const call = this.getApiCall(method);

            let response: AxiosResponse;

            if (method === 'get' || method === 'delete' || method === 'head' || method === 'options')
            {
                response = await call(url, config);
            }
            else
            {
                response = await call(url, data, config);
            }

            return response.data;
        }
        catch (e: any)
        {
            Logger.error(e.response.data);
        }
    }

    private getApiCall(method: string)
    {
        const calls = {
            post: this.axios.post,
            get: this.axios.get
        };

        // @ts-ignore
        return calls[method];
    }
}

export default AxiosHandler;
