import { IBodyResponse } from './IBodyResponse';
import { IFetchResponse } from './IFetchResponse';

interface ILoginBody extends IBodyResponse
{
    data: {
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        refreshExpiresIn: number;
    }
}

export interface ILoginResponse extends IFetchResponse
{
    body: ILoginBody;
}
