import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IRole from "../../../InterfaceAdapters/IEntities/IRole";
import RoleUpdatePayload from "../../../InterfaceAdapters/Payloads/Roles/RoleUpdatePayload";
import IRoleService from "../../../InterfaceAdapters/IServices/IRoleService";

class UpdateRoleUseCase
{
    @lazyInject(SERVICES.IRoleService)
    private service: IRoleService;

    async handle(payload: RoleUpdatePayload): Promise<IRole>
    {
        return await this.service.update(payload);
    }
}

export default UpdateRoleUseCase;
