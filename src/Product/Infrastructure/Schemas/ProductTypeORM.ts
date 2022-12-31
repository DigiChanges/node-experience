import { EntitySchema } from 'typeorm';
import Product from '../../Domain/Entities/Product';

const ProductSchema = new EntitySchema<Product>({
    name: 'Product',
    target: Product,
    tableName: 'products',
    columns: {
        _id: {
            type: 'uuid',
            primary: true,
            unique: true
        },
        title: {
            type: String
        },
        price: {
            type: Number
        },
        active: {
            type: Boolean,
            default: true
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
            name: 'id_product_1',
            unique: true,
            columns: ['_id']
        }
    ],
    uniques: [
        {
            name: 'unq_product_1',
            columns: ['_id']
        }
    ]
});

export default ProductSchema;
