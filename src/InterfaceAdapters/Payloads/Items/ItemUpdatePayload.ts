import IdPayload from "../Defaults/IdPayload";
import ItemRepPayload from "./ItemRepPayload";

interface ItemUpdatePayload extends IdPayload, ItemRepPayload {}

export default ItemUpdatePayload;