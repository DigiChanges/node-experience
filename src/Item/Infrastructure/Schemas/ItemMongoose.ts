import { Schema } from 'mongoose';
import Item from '../../Domain/Entities/Item';
import { uuid } from '@deepkit/type';

const ItemSchema: any = new Schema<Item>({
    _id: { type: String, default: uuid },
    name: { type: String, required: true },
    type: { type: Number, required: true },
    createdBy: { type: Schema.Types.String, ref: 'User' },
    lastModifiedBy: { type: Schema.Types.String, ref: 'User' }
}, { timestamps: true });

ItemSchema.loadClass(Item);

export default ItemSchema;
