import Transformer from "../../../Lib/Transformer";
import Item from "../../../Entities/Item";

class ItemTransformer implements Transformer
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