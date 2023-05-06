import { Schema, Document } from 'mongoose';
import ICategoryDomain from '../../Domain/Entities/IProductDomain';
import { uuid } from '@deepkit/type';
import Product from '../../Domain/Entities/Product';

export type ProductMongooseDocument = Document & ICategoryDomain;

const ProductSchema = new Schema({
    _id: { type: Schema.Types.String, default: uuid },
    title: { type: String, required: true },
    enable: { type: Boolean, required: true, default: true },
    category: { type: Schema.Types.String, ref: 'Category', required: true }
}, { timestamps: true });

ProductSchema.loadClass(Product);

export default ProductSchema;
