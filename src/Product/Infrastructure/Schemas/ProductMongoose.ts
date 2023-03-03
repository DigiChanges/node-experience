import { Schema, Document } from 'mongoose';
import Product from '../../Domain/Entities/Product';
import { uuid } from '@deepkit/type';
import IProductDomain from '../../Domain/Entities/IProductDomain';
import Category from 'Category/Domain/Entities/Category';

export type ProductMongooseDocument = Document & IProductDomain;

const ProductSchema: any = new Schema<Product>({
    _id: { type: String, default: uuid },
    price: { type: Number, required: true },
    title: { type: String, required: true },
    enable: { type: Boolean, required: true },
    category: { type: String, ref: 'Category' },
    createdBy: { type: Schema.Types.String, ref: 'User' },
    lastModifiedBy: { type: Schema.Types.String, ref: 'User' }
}, { timestamps: true });

ProductSchema.loadClass(Product);

export default ProductSchema;
