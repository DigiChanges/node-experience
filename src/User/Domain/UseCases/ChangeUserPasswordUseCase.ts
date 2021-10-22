import ChangeUserPasswordPayload from '../../InterfaceAdapters/Payloads/ChangeUserPasswordPayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';
import Password from '../../../App/Domain/ValueObjects/Password';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';


class ChangeUserPasswordUseCase
{
    @containerFactory(SERVICES.IUserService)
    private userService: UserService;

    async handle(payload: ChangeUserPasswordPayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.userService.getOne(id);

        const password = new Password(payload.getPassword());
        await password.ready();
        user.password = password;

        return await this.userService.persistPassword(user, payload);
    }
}

export default ChangeUserPasswordUseCase;
