import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import Password from '../../../App/Domain/ValueObjects/Password';
import MainConfig from '../../../Config/mainConfig';
import UserService from '../Services/UserService';

class ChangeUserPasswordUseCase
{
    private userService = new UserService();

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const config = MainConfig.getInstance();

        const id = payload.getId();
        const user: IUserDomain = await this.userService.getOne(id);

        const min = config.getConfig().validationSettings.password.minLength;
        const max = config.getConfig().validationSettings.password.maxLength;

        const password = new Password(payload.getPassword(), min, max);
        await password.ready();
        user.password = password;

        return await this.userService.persistPassword(user, payload);
    }
}

export default ChangeUserPasswordUseCase;
