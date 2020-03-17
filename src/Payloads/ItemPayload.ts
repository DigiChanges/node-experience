import { Item } from "../Entities/Item";

interface ItemPayload {
    item(): Item;
}

export default ItemPayload