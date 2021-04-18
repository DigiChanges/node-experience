import RoleUpdatePayload from '../../InterfaceAdapters/Payloads/RoleUpdatePayload';
import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import {REPOSITORIES} from '../../../repositories';
import {SERVICES} from '../../../services';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import IAuthService from '../../../App/InterfaceAdapters/IAuthService';
import ContainerFactory from '../../../App/Infrastructure/Factories/ContainerFactory';

class UpdateRoleUseCase
{
    private repository: IRoleRepository;
    private authService: IAuthService;

    constructor()
    {
        this.repository = ContainerFactory.create<IRoleRepository>(REPOSITORIES.IRoleRepository);
        this.authService = ContainerFactory.create<IAuthService>(SERVICES.IAuthService);
    }

    async handle(payload: RoleUpdatePayload): Promise<IRoleDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        const id = payload.getId();
        const role: IRoleDomain = await this.repository.getOne(id);

        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        return await this.repository.save(role);
    }
}

export default UpdateRoleUseCase;
