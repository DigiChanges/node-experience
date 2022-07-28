import { getRequestContext } from '../../../App/Presentation/Shared/RequestContext';
import ChangeMyPasswordPayload from '../Payloads/ChangeMyPasswordPayload';
import IUserDomain from '../Entities/IUserDomain';
import PasswordWrongException from '../../../Auth/Domain/Exceptions/PasswordWrongException';
import EncryptionFactory from '../../../Shared/Factories/EncryptionFactory';
import UserService from '../Services/UserService';
import { SERVICES } from '../../../Config/Injects';

class ChangeMyPasswordUseCase
{
    private encryption = EncryptionFactory.create();
    private userService = new UserService();

    constructor()
    {
        const { container } = getRequestContext();
        this.userService = container.resolve<UserService>(SERVICES.UserService);
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
