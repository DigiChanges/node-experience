import { IBodyResponse } from './IBodyResponse';
import { IFetchResponse } from './IFetchResponse';

interface ILoginBody extends IBodyResponse
{
    data: {
        token: string;
    }
}

export interface ILoginResponse extends IFetchResponse
{
    body: ILoginBody;
}
