import ChangeMyPasswordPayload from '../Payloads/ChangeMyPasswordPayload';
import IUserDomain from '../Entities/IUserDomain';
import PasswordWrongException from '../../../Auth/Domain/Exceptions/PasswordWrongException';
import Password from '../../../App/Domain/ValueObjects/Password';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import MainConfig from '../../../Config/mainConfig';
import UserService from '../Services/UserService';

class ChangeMyPasswordUseCase
{
    private userService = new UserService();

    private encryption = EncryptionFactory.create();

    async handle(payload: ChangeMyPasswordPayload): Promise<IUserDomain>
    {
        const config = MainConfig.getInstance();

        const id = payload.id;
        const user: IUserDomain = await this.userService.getOne(id);

        if (! await this.encryption.compare(payload.currentPassword, user.password.toString()))
        {
            throw new PasswordWrongException();
        }

        const min = config.getConfig().validationSettings.password.minLength;
        const max = config.getConfig().validationSettings.password.maxLength;

        user.password = await (new Password(payload.password, min, max)).ready();

        return await this.userService.persistPassword(user, payload);
    }
}

export default ChangeMyPasswordUseCase;
