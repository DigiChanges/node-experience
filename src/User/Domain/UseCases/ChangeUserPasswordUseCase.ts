import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import Password from '../../../App/Domain/ValueObjects/Password';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';
import MainConfig from '../../../Config/mainConfig';
import IUserService from '../../InterfaceAdapters/IUserService';

class ChangeUserPasswordUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: IUserService;

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
