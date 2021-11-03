import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';
import Password from '../../../App/Domain/ValueObjects/Password';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import { mainConfig } from '../../../Config/mainConfig';


class ChangeUserPasswordUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: UserService;

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.userService.getOne(id);

        const min = mainConfig.validationSettings.password.minLength;
        const max = mainConfig.validationSettings.password.maxLength;

        const password = new Password(payload.getPassword(), min, max);
        await password.ready();
        user.password = password;

        return await this.userService.persistPassword(user, payload);
    }
}

export default ChangeUserPasswordUseCase;
