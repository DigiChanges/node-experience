import RoleRepPayload from '../../InterfaceAdapters/Payloads/RoleRepPayload';
import IRoleRepository from '../../InterfaceAdapters/IRoleRepository';
import Role from '../Entities/Role';
import { REPOSITORIES } from '../../../Config/repositories';
import { SERVICES } from '../../../services';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import IAuthService from '../../../Auth/InterfaceAdapters/IAuthService';
import { containerFactory } from '../../../Shared/Decorators/ContainerFactory';

class SaveRoleUseCase
{
    @containerFactory(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    @containerFactory(SERVICES.IAuthService)
    private authService: IAuthService;

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
