import { EntitySchema } from '@mikro-orm/core';
import Item from '../../Domain/Entities/Item';

const ItemSchema = new EntitySchema<Item>({
    name: 'Item',
    tableName: 'items',
    class: Item,
    indexes: [{ name: 'id_item_1', properties: '_id' }],
    uniques: [{ name: 'unq_item_1', properties: ['_id'] }],
    properties: {
        _id: {
            type: 'uuid',
            defaultRaw: 'uuid_generate_v4()',
            primary: true,
            unique: true
        },
        name: {
            type: 'string'
        },
        type: {
            type: 'number'
        },
        createdAt: {
            type: 'Date',
            onCreate: () => new Date(), nullable: true
        },
        updatedAt: {
            type: 'Date',
            onCreate: () => new Date(),
            onUpdate: () => new Date(), nullable: true
        }
    }
});

export default ItemSchema;
