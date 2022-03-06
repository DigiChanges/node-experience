import ChangeUserPasswordPayload from '../Payloads/ChangeUserPasswordPayload';
import IUserDomain from '../Entities/IUserDomain';
import Password from '../../../App/Domain/ValueObjects/Password';
import MainConfig from '../../../Config/mainConfig';
import UserService from '../Services/UserService';

class ChangeUserPasswordUseCase
{
    private userService = new UserService();

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const config = MainConfig.getInstance();

        const id = payload.id;
        const user: IUserDomain = await this.userService.getOne(id);

        const min = config.getConfig().validationSettings.password.minLength;
        const max = config.getConfig().validationSettings.password.maxLength;

        user.password = await (new Password(payload.password, min, max)).ready();

        return await this.userService.persistPassword(user, payload);
    }
}

export default ChangeUserPasswordUseCase;
