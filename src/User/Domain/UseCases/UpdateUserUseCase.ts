import UserUpdatePayload from '../../InterfaceAdapters/Payloads/UserUpdatePayload';
import IUserRepository from '../../InterfaceAdapters/IUserRepository';
import CheckUserRolePayload from '../../InterfaceAdapters/Payloads/CheckUserRolePayload';
import Roles from '../../../Config/Roles';
import IRoleRepository from '../../../Role/InterfaceAdapters/IRoleRepository';
import {REPOSITORIES} from '../../../repositories';
import {SERVICES} from '../../../services';
import IUserDomain from '../../InterfaceAdapters/IUserDomain';
import CantDisabledException from '../../../Auth/Domain/Exceptions/CantDisabledException';
import {containerFactory} from '../../../App/Infrastructure/Factories/ContainerFactory';
import IAuthService from '../../../App/InterfaceAdapters/IAuthService';
import IRoleDomain from '../../../Role/InterfaceAdapters/IRoleDomain';

class UpdateUserUseCase
{
    @containerFactory(REPOSITORIES.IUserRepository)
    private repository: IUserRepository;

    @containerFactory(REPOSITORIES.IRoleRepository)
    private roleRepository: IRoleRepository;

    @containerFactory(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: UserUpdatePayload): Promise<IUserDomain>
    {
        const id = payload.getId();
        const user: IUserDomain = await this.repository.getOne(id);
        let enable = payload.getEnable();

        if (payload.getTokenUserId() === user.getId())
        {
            enable = true;
        }

        if (typeof user.roles !== 'undefined' && enable !== null) // TODO: Refactoring
        {
            const checkRole: CheckUserRolePayload = {
                roleToCheck: Roles.SUPER_ADMIN.toLocaleLowerCase(),
                user
            };

            const verifyRole = await this.checkIfUserHasRole(checkRole);

            if (verifyRole && !enable)
            {
                throw new CantDisabledException();
            }
        }

        user.firstName = payload.getFirstName();
        user.lastName = payload.getLastName();
        user.enable = payload.getEnable();
        user.email = payload.getEmail();
        user.birthday = payload.getBirthday();
        user.documentType = payload.getDocumentType();
        user.documentNumber = payload.getDocumentNumber();
        user.gender = payload.getGender();
        user.phone = payload.getPhone();
        user.country = payload.getCountry();
        user.address = payload.getAddress();
        user.permissions = payload.getPermissions();

        await this.repository.save(user);

        return user;
    }

    public async checkIfUserHasRole(payload: CheckUserRolePayload): Promise<boolean> // TODO: Create a user service
    {
        const count = payload.user.roles.length;

        for (let i = 0; i < count; i++)
        {
            const role: IRoleDomain = await this.roleRepository.getOne(payload.user.roles[i].getId());

            if (role.slug === payload.roleToCheck)
            {
                return true;
            }
        }

        return false;
    }
}

export default UpdateUserUseCase;
