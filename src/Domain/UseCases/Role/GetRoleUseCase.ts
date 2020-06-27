import { lazyInject } from "../../../inversify.config";
import { SERVICES } from "../../../services";
import IRoleService from "../../../InterfaceAdapters/IServices/IRoleService";
import IRole from "../../../InterfaceAdapters/IEntities/IRole";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";

class GetRoleUseCase
{
    @lazyInject(SERVICES.IRoleService)
    private service: IRoleService;

    async handle(payload: IdPayload): Promise<IRole>
    {
        return await this.service.getOne(payload);
    }
}

export default GetRoleUseCase;
