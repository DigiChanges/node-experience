import { lazyInject } from '../../../inversify.config'
import RoleUpdatePayload from "../../../InterfaceAdapters/Payloads/Roles/RoleUpdatePayload";
import IRoleRepository from "../../../InterfaceAdapters/IRepositories/IRoleRepository";
import {REPOSITORIES} from "../../../repositories";
import {SERVICES} from "../../../services";
import IRoleDomain from "../../../InterfaceAdapters/IDomain/IRoleDomain";
import IAuthService from "../../../InterfaceAdapters/IServices/IAuthService";

class UpdateRoleUseCase
{
    @lazyInject(REPOSITORIES.IRoleRepository)
    private repository: IRoleRepository;

    @lazyInject(SERVICES.IAuthService)
    private authService: IAuthService;

    async handle(payload: RoleUpdatePayload): Promise<IRoleDomain>
    {
        this.authService.validatePermissions(payload.getPermissions());

        const id = payload.getId();
        let role: IRoleDomain = await this.repository.getOne(id);

        role.name = payload.getName();
        role.slug = payload.getSlug();
        role.permissions = payload.getPermissions();
        role.enable = payload.getEnable();

        return await this.repository.save(role);
    }
}

export default UpdateRoleUseCase;
