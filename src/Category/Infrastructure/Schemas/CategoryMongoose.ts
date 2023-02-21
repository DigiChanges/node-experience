import { Schema, Document } from 'mongoose';
import Category from '../../Domain/Entities/Category';
import { uuid } from '@deepkit/type';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';

export type CategoryMongooseDocument = Document & ICategoryDomain;

const CategorySchema: any = new Schema<Category>({
    _id: { type: String, default: uuid },
    title: { type: String, required: true },
    enable: { type: Boolean, required: true }
}, { timestamps: true });

CategorySchema.loadClass(Category);

export default CategorySchema;
