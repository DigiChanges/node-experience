import UserUpdatePayload from '../Payloads/UserUpdatePayload';
import IUserDomain from '../Entities/IUserDomain';
import CheckUserRolePayload from '../Payloads/CheckUserRolePayload';
import Roles from '../../../Config/Roles';
import CantDisabledException from '../../../Auth/Domain/Exceptions/CantDisabledException';
import UserService from '../Services/UserService';
import { REPOSITORIES, SERVICES } from '../../../Config/Injects';
import IUserRepository from '../../Infrastructure/Repositories/IUserRepository';
import { getRequestContext } from '../../../App/Presentation/Shared/RequestContext';

class UpdateUserUseCase
{
    private repository: IUserRepository;
    private userService: UserService;

    constructor()
    {
        const { container } = getRequestContext();
        this.repository = container.resolve<IUserRepository>(REPOSITORIES.IUserRepository);
        this.userService = container.resolve<UserService>(SERVICES.UserService);
    }

    async handle(payload: UserUpdatePayload): Promise<IUserDomain>
    {
        const { id } = payload;
        const user: IUserDomain = await this.repository.getOneBy({ _id : id }, { populate: 'roles' });
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

        user.updateRep(payload);
        await this.userService.validate(user);
        await this.repository.update(user);

        return user;
    }
}

export default UpdateUserUseCase;
