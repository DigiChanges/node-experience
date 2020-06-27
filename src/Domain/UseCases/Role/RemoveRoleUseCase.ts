import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import IRoleService from "../../../InterfaceAdapters/IServices/IRoleService";

class RemoveRoleUseCase
{
    @lazyInject(SERVICES.IRoleService)
    private service: IRoleService;

    async handle(payload: IdPayload): Promise<any>
    {
        return await this.service.remove(payload);
    }
}

export default RemoveRoleUseCase;
