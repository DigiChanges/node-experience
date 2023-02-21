
import { Schema, Document } from 'mongoose';
import Product from '../../Domain/Entities/Product';
import { uuid } from '@deepkit/type';
import IProductDomain from '../../Domain/Entities/IProductDomain';

export type ProductMongooseDocument = Document & IProductDomain;

const ProductSchema: any = new Schema<Product>({
    _id: { type: String, default: uuid },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    enable: { type: Boolean, required: true },
    category: { type: Schema.Types.String, ref: 'Category' }


}, { timestamps: true });

ProductSchema.loadClass(Product);

export default ProductSchema;
