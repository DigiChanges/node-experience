import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IItemService from "../../../InterfaceAdapters/IServices/IItemService";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";

class RemoveItemUseCase
{
    @lazyInject(SERVICES.IItemService)
    private service: IItemService;

    async handle(payload: IdPayload): Promise<any>
    {
        return await this.service.remove(payload);
    }
}

export default RemoveItemUseCase;
