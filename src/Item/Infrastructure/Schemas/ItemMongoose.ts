import { Schema, Document } from 'mongoose';
import Item from '../../Domain/Entities/Item';
import { uuid } from '@deepkit/type';
import IItemDomain from '../../Domain/Entities/IItemDomain';

export type ItemMongooseDocument = Document & IItemDomain;

const ItemSchema: any = new Schema<Item>({
    _id: { type: String, default: uuid },
    name: { type: String, required: true },
    type: { type: Number, required: true }
}, { timestamps: true });

ItemSchema.loadClass(Item);

export default ItemSchema;
