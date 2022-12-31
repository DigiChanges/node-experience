import { EntitySchema } from '@mikro-orm/core';
import Product from '../../Domain/Entities/Product';

const ProductSchema = new EntitySchema<Product>({
    name: 'Product',
    tableName: 'products',
    class: Product,
    indexes: [{ name: 'id_product_1', properties: '_id' }],
    properties: {
        _id: {
            type: 'uuid',
            defaultRaw: 'uuid_generate_v4()',
            primary: true,
            unique: true
        },
        title: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        active: {
            type: 'boolean',
            default: true
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

export default ProductSchema;
