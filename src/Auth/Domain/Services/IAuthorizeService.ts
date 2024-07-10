import IDecodeToken from '../Models/IDecodeToken';

abstract class IAuthorizeService
{
    abstract getConfirmationToken(email: string): string;
    abstract decodeToken(token: string): IDecodeToken;
    abstract authorize(userId: string, permission: string): Promise<void>;
    abstract getAuthUser(data: string): Promise<any>;
}

export default IAuthorizeService;
