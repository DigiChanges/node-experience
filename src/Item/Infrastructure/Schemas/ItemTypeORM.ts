import { EntitySchema } from 'typeorm';
import Item from '../../Domain/Entities/Item';

const ItemSchema = new EntitySchema<Item>({
    name: 'Item',
    target: Item,
    tableName: 'items',
    columns: {
        _id: {
            type: 'uuid',
            primary: true,
            unique: true
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
            createDate: true
        },
        updatedAt: {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            updateDate: true
        }
    },
    indices: [
        {
            name: 'id_item_1',
            unique: true,
            columns: ['_id']
        }
    ],
    uniques: [
        {
            name: 'unq_item_1',
            columns: ['_id']
        }
    ]
});

export default ItemSchema;
