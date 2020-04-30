import ICriteria from "../../Lib/Contracts/ICriteria";
import IdPayload from "../../Payloads/Defaults/IdPayload";
import ItemRepPayload from "../../Payloads/Items/ItemRepPayload";
import ItemUpdatePayload from "../../Payloads/Items/ItemUpdatePayload";

interface IItemService
{
    save (payload: ItemRepPayload): any;
    update (payload: ItemUpdatePayload): any;
    list (criteria: ICriteria): any;
    getOne (payload: IdPayload): any;
    remove (payload: IdPayload): any;
}

export default IItemService;