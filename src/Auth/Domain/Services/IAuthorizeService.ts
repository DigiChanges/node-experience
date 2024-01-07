import IDecodeToken from '../Models/IDecodeToken';

interface IAuthorizeService
{
    getConfirmationToken(email: string): string;
    decodeToken(token: string): IDecodeToken;
    authorize(userId: string, permission: string): Promise<void>;
    getAuthUser(data: string): Promise<any>;
}

export default IAuthorizeService;
