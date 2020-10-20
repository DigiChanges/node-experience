import { EntitySchema } from "typeorm";
import Item from "../../../Domain/Entities/Item";

const ItemSchema = new EntitySchema<Item>({
    name: "item",
    columns: {
        _id: {
            type: String,
            primary: true
        },
        name: {
            type: String
        },
        type: {
            type: Number
        },
        createdAt: {
            name: 'createdAt',
            type: 'timestamp with time zone',
            createDate: true,
        },
        updatedAt: {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            updateDate: true,
        }
    }
});

export default ItemSchema;