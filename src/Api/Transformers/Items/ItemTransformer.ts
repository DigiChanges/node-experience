import Transformer from "../../../Lib/Transformer";
import Item from "../../../Entities/Item";

class ItemTransformer extends Transformer
{
    public transform(item: Item)
    {
        return {
          'id': item.getId(),
          'name': item.getName(),
          'type': item.getType(),
          'createdAt': item.getCreatedAt(),
          'updatedAt': item.getUpdatedAt(),
        };
    }
}

export default ItemTransformer;