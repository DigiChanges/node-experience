import RoleRepPayload from '../../InterfaceAdapters/Payloads/RoleRepPayload';
import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import Role from '../Entities/Role';
import {REPOSITORIES} from '../../../repositories';
import {SERVICES} from '../../../services';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import IAuthService from '../../../App/InterfaceAdapters/IAuthService';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';

class SaveRoleUseCase
{
    private repository: IRoleRepository;
    private authService: IAuthService;

    constructor()
    {
        this.repository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
        this.authService = ContainerFactory.create<IAuthService>(SERVICES.IAuthService);
    }

    async handle(payload: RoleRepPayload): Promise<IRoleDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        const role = new Role();
        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        return await this.repository.save(role);
    }
}

export default SaveRoleUseCase;
