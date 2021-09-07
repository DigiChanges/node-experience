import {EntitySchema} from 'typeorm';
import Item from '../../Domain/Entities/Item';
import IItemRelationships from '../../InterfaceAdapters/IItemRelationships';

const ItemSchema = new EntitySchema<Item & IItemRelationships>({
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
