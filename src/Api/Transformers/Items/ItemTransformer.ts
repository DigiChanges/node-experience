// @ts-ignore
import moment from "moment";
import Transformer from "../../../Lib/Transformer";
import Item from "../../../Entities/Item";

class ItemTransformer extends Transformer
{
    public transform(item: Item)
    {
        return {
          'id': item._id,
          'name': item.name,
          'type': item.type,
          'enable': item.enable,
          'createdAt': moment(item.createdAt).format('DD-MM-YYYY HH:SS'),
          'updatedAt': moment(item.updatedAt).format('DD-MM-YYYY HH:SS'),
        };
    }
}

export default ItemTransformer;