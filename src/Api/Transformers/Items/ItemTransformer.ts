import Transformer from "../../../Lib/Transformer";
import Item from "../../../Entities/Item";
import moment from "moment";

class ItemTransformer extends Transformer
{
    public transform(item: Item)
    {
        return {
          'id': item.getId(),
          'name': item.getName(),
          'type': item.getType(),
          'enable': item.isEnable(),
          'createdAt': moment(item.getCreatedAt()).format('DD-MM-YYYY HH:SS'),
          'updatedAt': moment(item.getUpdatedAt()).format('DD-MM-YYYY HH:SS'),
        };
    }
}

export default ItemTransformer;