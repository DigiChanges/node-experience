import { Schema, Document } from 'mongoose';
import ICategoryDomain from '../../Domain/Entities/ICategoryDomain';
import { uuid } from '@deepkit/type';
import Category from '../../Domain/Entities/Category';

export type CategoryMongooseDocument = Document & ICategoryDomain;

const CategorySchema = new Schema({
    _id: { type: Schema.Types.String, default: uuid },
    title: { type: String, required: true },
    enable: { type: Boolean, required: true }
});

CategorySchema.loadClass(Category);

export default CategorySchema;
