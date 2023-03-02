import { Schema, Document } from 'mongoose';
import Category from 'Category/Domain/Entitites/Category';
import { uuid } from '@deepkit/type';
import ICategoryDomain from 'Category/Domain/Entitites/ICategoryDomain';

export type CategoryMongooseDocument = Document & ICategoryDomain;

const CategorySchema: any = new Schema<Category>(
  {
    _id: { type: String, default: uuid },
    title: { type: String, required: true },
    enable: { type: Boolean, required: true },
    createdBy: { type: Schema.Types.String, ref: 'User' },
    lastModifiedBy: { type: Schema.Types.String, ref: 'User' },
  },
  { timestamps: true }
);

CategorySchema.loadClass(Category);

export default CategorySchema;
