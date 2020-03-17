import Transformer from "../../../Lib/Transformer";
import { Item } from "../../../Entities/Item";

class ItemTransformer implements Transformer
{
    public transform(item: Item)
    {
        return {
          'id': item.id,
          'name': item.name,
          'type': item.type,
        };
    }
}

export default ItemTransformer;