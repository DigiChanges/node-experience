import UserUpdatePayload from '../Payloads/UserUpdatePayload';
import IUserDomain from '../Entities/IUserDomain';
import CheckUserRolePayload from '../Payloads/CheckUserRolePayload';
import Roles from '../../../Config/Roles';
import CantDisabledException from '../../../Auth/Domain/Exceptions/CantDisabledException';
import UserService from '../Services/UserService';

class UpdateUserUseCase
{
    private userService = new UserService();

    async handle(payload: UserUpdatePayload): Promise<IUserDomain>
    {
        const id = payload.id;
        const user: IUserDomain = await this.userService.getOne(id);
        let enable = payload.enable;

        if (payload.tokenUserId === user.getId())
        {
            enable = true;
        }

        if (typeof user.roles !== 'undefined' && enable !== null) // TODO: Refactoring
        {
            const checkRole: CheckUserRolePayload = {
                roleToCheck: Roles.SUPER_ADMIN.toLocaleLowerCase(),
                user
            };

            const verifyRole = await this.userService.checkIfUserHasRole(checkRole);

            if (verifyRole && !enable)
            {
                throw new CantDisabledException();
            }
        }

        return await this.userService.persist(user, payload);
    }
}

export default UpdateUserUseCase;
