import ChangeMyPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';
import PasswordWrongException from '../../../Auth/Domain/Exceptions/PasswordWrongException';
import { IEncryption } from '@digichanges/shared-experience';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';

class ChangeMyPasswordUseCase
{
    private user_service = new UserService();
    private encryption: IEncryption;

    constructor()
    {
        this.encryption = EncryptionFactory.create();
    }

    async handle(payload: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.get_id();
        const user: IUserDomain = await this.user_service.get_one(id);

        if (! await this.encryption.compare(payload.get_current_password(), user.password))
        {
            throw new PasswordWrongException();
        }

        return await this.user_service.persist_password(user, payload);
    }
}

export default ChangeMyPasswordUseCase;
