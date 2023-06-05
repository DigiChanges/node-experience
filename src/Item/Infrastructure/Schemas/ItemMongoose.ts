import { Schema, Document } from 'mongoose';
import Item from '../../Domain/Entities/Item';
import { randomUUID } from 'crypto';
import IItemDomain from '../../Domain/Entities/IItemDomain';

export type ItemMongooseDocument = Document & IItemDomain;

const ItemSchema: any = new Schema<Item>({
    _id: { type: String, default: randomUUID },
    name: { type: String, required: true },
    type: { type: Number, required: true }
}, { timestamps: true });

ItemSchema.loadClass(Item);

export default ItemSchema;
