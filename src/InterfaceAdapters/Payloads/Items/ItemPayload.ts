import Item from "../../../Infrastructure/Entities/Item";

interface ItemPayload {
    item(): Item;
}

export default ItemPayload