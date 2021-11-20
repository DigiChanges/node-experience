import ChangeMyPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeMyPasswordPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
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

        const id = payload.getId();
        const user: IUserDomain = await this.userService.getOne(id);

        if (! await this.encryption.compare(payload.getCurrentPassword(), user.password.toString()))
        {
            throw new PasswordWrongException();
        }

        const min = config.getConfig().validationSettings.password.minLength;
        const max = config.getConfig().validationSettings.password.maxLength;

        const password = new Password(payload.getPassword(), min, max);
        await password.ready();
        user.password = password;

        return await this.userService.persistPassword(user, payload);
    }
}

export default ChangeMyPasswordUseCase;
