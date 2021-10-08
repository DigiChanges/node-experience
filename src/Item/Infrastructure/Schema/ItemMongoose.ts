import { Schema } from 'mongoose';
import Item from '../../Domain/Entities/Item';
import { v4 as uuidv4 } from 'uuid';

const ItemSchema: any = new Schema<Item>({
    _id: { type: String, default: uuidv4 },
    name: { type:String, required: true },
    type: { type:Number, required: true },
    created_by: { type: Schema.Types.String, ref: 'User' },
    last_modified_by: { type: Schema.Types.String, ref: 'User' }
}, { timestamps: true });

ItemSchema.loadClass(Item);

export default ItemSchema;
