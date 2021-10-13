import UserUpdatePayload from '../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import UserService from '../Services/UserService';
import CheckUserRolePayload from '../../InterfaceAdapters/Payloads/CheckUserRolePayload';
import Roles from '../../../Config/Roles';
import CantDisabledException from '../../../Auth/Domain/Exceptions/CantDisabledException';

class UpdateUserUseCase
{
    private user_service = new UserService();

    async handle(payload: UserUpdatePayload): Promise<IUserDomain>
    {
        const id = payload.get_id();
        const user: IUserDomain = await this.user_service.get_one(id);
        let enable = payload.get_enable();

        if (payload.get_token_user_id() === user.get_id())
        {
            enable = true;
        }

        if (typeof user.roles !== 'undefined' && enable !== null) // TODO: Refactoring
        {
            const checkRole: CheckUserRolePayload = {
                role_to_check: Roles.SUPER_ADMIN.toLocaleLowerCase(),
                user
            };

            const verifyRole = await this.user_service.check_if_user_has_role(checkRole);

            if (verifyRole && !enable)
            {
                throw new CantDisabledException();
            }
        }

        return await this.user_service.persist(user, payload);
    }

}

export default UpdateUserUseCase;
