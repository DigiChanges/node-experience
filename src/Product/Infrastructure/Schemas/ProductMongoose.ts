import { Schema } from 'mongoose';
import Product from '../../Domain/Entities/Product';
import { uuid } from '@deepkit/type';

const ProductSchema: any = new Schema({
    _id: { type: String, default: uuid },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    active: { type: Boolean, required: true, default: true }
}, { timestamps: true });

ProductSchema.loadClass(Product);

export default ProductSchema;
