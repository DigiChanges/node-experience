import UserUpdatePayload from '../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';
import CheckUserRolePayload from '../../InterfaceAdapters/Payloads/CheckUserRolePayload';
import Roles from '../../../Config/Roles';
import CantDisabledException from '../../../Auth/Domain/Exceptions/CantDisabledException';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';
import { SERVICES } from '../../../services';

class UpdateUserUseCase
{
    @containerFactory(SERVICES.IUserService)
    private user_service: UserService;

    async handle(payload: UserUpdatePayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.user_service.getOne(id);
        let enable = payload.getEnable();

        if (payload.getTokenUserId() === user.getId())
        {
            enable = true;
        }

        if (typeof user.roles !== 'undefined' && enable !== null) // TODO: Refactoring
        {
            const checkRole: CheckUserRolePayload = {
                role_to_check: Roles.SUPER_ADMIN.toLocaleLowerCase(),
                user
            };

            const verifyRole = await this.user_service.checkIfUserHasRole(checkRole);

            if (verifyRole && !enable)
            {
                throw new CantDisabledException();
            }
        }

        return await this.user_service.persist(user, payload);
    }

}

export default UpdateUserUseCase;
