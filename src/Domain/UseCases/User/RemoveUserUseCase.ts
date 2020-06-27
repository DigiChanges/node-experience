import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import IUserService from "../../../InterfaceAdapters/IServices/IUserService";

class RemoveUserUseCase
{
    @lazyInject(SERVICES.IUserService)
    private service: IUserService;

    async handle(data: IdPayload): Promise<any>
    {
        return await this.service.remove(data);
    }
}

export default RemoveUserUseCase;
