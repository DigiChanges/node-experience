import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import RoleRepPayload from "../../../InterfaceAdapters/Payloads/Roles/RoleRepPayload";
import IRole from "../../../InterfaceAdapters/IEntities/IRole";
import IRoleService from "../../../InterfaceAdapters/IServices/IRoleService";

class SaveRoleUseCase
{
    @lazyInject(SERVICES.IRoleService)
    private service: IRoleService;

    async handle(data: RoleRepPayload): Promise<IRole>
    {
        return await this.service.save(data);
    }
}

export default SaveRoleUseCase;
