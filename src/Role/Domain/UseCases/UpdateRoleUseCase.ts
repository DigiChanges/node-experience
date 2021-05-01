import RoleUpdatePayload from '../../InterfaceAdapters/Payloads/RoleUpdatePayload';
import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import {REPOSITORIES} from '../../../repositories';
import {SERVICES} from '../../../services';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import IAuthService from '../../../Auth/InterfaceAdapters/IAuthService';
import {containerFactory} from '../../../Shared/Decorators/ContainerFactory';

class UpdateRoleUseCase
{
    @containerFactory(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    @containerFactory(SERVICES.IAuthService)
    private authService: IAuthService;

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
