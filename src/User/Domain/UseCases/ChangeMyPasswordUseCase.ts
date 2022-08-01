import { getRequestContext } from '../../../Shared/Presentation/Shared/RequestContext';
import ChangeMyPasswordPayload from '../Payloads/ChangeMyPasswordPayload';
import IUserDomain from '../Entities/IUserDomain';
import PasswordWrongException from '../../../Auth/Domain/Exceptions/PasswordWrongException';
import UserService from '../Services/UserService';
import { FACTORIES, SERVICES } from '../../../Config/Injects';
import IEncryption from '../../../Shared/Infrastructure/Encryption/IEncryption';

class ChangeMyPasswordUseCase
{
    private encryption: IEncryption;
    private userService: UserService;

    constructor()
    {
        const { container } = getRequestContext();
        this.userService = container.resolve<UserService>(SERVICES.UserService);
        this.encryption = container.resolve<IEncryption>(FACTORIES.BcryptEncryptionStrategy);
    }

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
