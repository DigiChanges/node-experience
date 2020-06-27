import { lazyInject } from '../../../inversify.config'
import {SERVICES} from "../../../services";
import IItemService from "../../../InterfaceAdapters/IServices/IItemService";
import IItem from "../../../InterfaceAdapters/IEntities/IItem";
import ItemUpdatePayload from "../../../InterfaceAdapters/Payloads/Items/ItemUpdatePayload";

class UpdateItemUseCase
{
    @lazyInject(SERVICES.IItemService)
    private service: IItemService;

    async handle(data: ItemUpdatePayload): Promise<IItem>
    {
        return await this.service.update(data);
    }
}

export default UpdateItemUseCase;
