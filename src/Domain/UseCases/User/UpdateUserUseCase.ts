import UserUpdatePayload from '../../../InterfaceAdapters/Payloads/Users/UserUpdatePayload';
import IUserRepository from '../../../InterfaceAdapters/IRepositories/IUserRepository';
import CheckUserRolePayload from '../../../InterfaceAdapters/Payloads/Auxiliars/CheckUserRolePayload';
import Roles from '../../../Config/Roles';
import IRoleRepository from '../../../InterfaceAdapters/IRepositories/IRoleRepository';
import {REPOSITORIES} from '../../../repositories';
import {SERVICES} from '../../../services';
import IUserDomain from '../../../InterfaceAdapters/IDomain/IUserDomain';
import CantDisabledException from '../../Exceptions/CantDisabledException';
import ContainerFactory from '../../../Infrastructure/Factories/ContainerFactory';
import IAuthService from '../../../InterfaceAdapters/IServices/IAuthService';
import IRoleDomain from '../../../InterfaceAdapters/IDomain/IRoleDomain';

class UpdateUserUseCase
{
    private repository: IUserRepository;
    private authService: IAuthService;

    constructor()
    {
        this.repository = ContainerFactory.create<IUserRepository>(REPOSITORIES.IUserRepository);
        this.authService = ContainerFactory.create<IAuthService>(SERVICES.IAuthService);
    }

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
        const roleRepository: IRoleRepository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
        const count = payload.user.roles.length;

        for (let i = 0; i < count; i++)
        {
            const role: IRoleDomain = await roleRepository.getOne(payload.user.roles[i].getId());

            if (role.slug === payload.roleToCheck)
            {
                return true;
            }
        }

        return false;
    }
}

export default UpdateUserUseCase;
