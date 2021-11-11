import { Mixin } from 'ts-mixer';
import UserRepPasswordRequest from '../../../../User/Presentation/Requests/Express/UserRepPasswordRequest';
import RegisterPayload from '../../../InterfaceAdapters/Payloads/RegisterPayload';
import UserWithoutPermissionsRequest
    from '../../../../User/Presentation/Requests/Express/UserWithoutPermissionsRequest';
import moment from 'moment';
import EncryptionFactory from '../../../../Shared/Factories/EncryptionFactory';

class RegisterRequest extends Mixin(UserWithoutPermissionsRequest, UserRepPasswordRequest) implements RegisterPayload
{
    constructor(data: Record<string, any>)
    {
        super(data);
    }

    async getConfirmationToken(): Promise<string>
    {
        const encryption = EncryptionFactory.create('md5');

        const stringToEncrypt = `${this.email}${moment().utc().unix()}`;

        return await encryption.encrypt(stringToEncrypt);
    }
}

export default RegisterRequest;
