import ChangeMyPasswordPayload from '../Payloads/ChangeMyPasswordPayload';
import IUserDomain from '../Entities/IUserDomain';
import PasswordWrongException from '../../../Auth/Domain/Exceptions/PasswordWrongException';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import UserService from '../Services/UserService';

class ChangeMyPasswordUseCase
{
    private encryption = EncryptionFactory.create();
    private userService = new UserService();

    async handle(payload: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        const user: IUserDomain = await this.userService.getOne(payload.id);

        if (! await this.encryption.compare(payload.currentPassword, user.password.toString()))
        {
            throw new PasswordWrongException();
        }

        return await this.userService.updatePassword(user, payload);
    }
}

export default ChangeMyPasswordUseCase;
