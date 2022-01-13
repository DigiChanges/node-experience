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
    relations: {
        createdBy: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: true,
            eager: true
        },
        lastModifiedBy: {
            type: 'many-to-one',
            target: 'User',
            joinColumn: true,
            eager: true
        }
    }
});

export default ItemSchema;
