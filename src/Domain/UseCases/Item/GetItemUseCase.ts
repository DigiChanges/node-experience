import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IItemService from "../../../InterfaceAdapters/IServices/IItemService";
import IItem from "../../../InterfaceAdapters/IEntities/IItem";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";

class GetItemUseCase
{
    @lazyInject(SERVICES.IItemService)
    private service: IItemService;

    async handle(data: IdPayload): Promise<IItem>
    {
        return await this.service.getOne(data);
    }
}

export default GetItemUseCase;
