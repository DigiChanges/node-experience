import { ErrorException } from '../../Domain/Errors/ErrorException';

export class DecryptForbiddenException extends ErrorException
{
    constructor()
    {
        const key = 'shared.exceptions.decryptForbidden';
        super({
            message: 'Decrypt forbidden.',
            errorCode: key
        }, DecryptForbiddenException.name);
    }
}
