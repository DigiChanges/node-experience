import { EntitySchema } from 'typeorm';
import Item from '../../Domain/Entities/Item';

const ItemSchema = new EntitySchema<Item>({
    name: 'Item',
    target: Item,
    tableName: 'items',
    columns: {
        _id: {
            type: String,
            primary: true,
            unique: true
        },
        name: {
            type: String
        },
        type: {
            type: Number
        },
        created_at: {
            name: 'createdAt',
            type: 'timestamp with time zone',
            createDate: true
        },
        updated_at: {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            updateDate: true
        }
    },
    relations: {
        created_by: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: true,
            eager: true
        },
        last_modified_by: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: true,
            eager: true
        }
    }
});

export default ItemSchema;
