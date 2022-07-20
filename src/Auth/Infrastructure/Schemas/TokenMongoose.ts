import { Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Token from '../../Domain/Entities/Token';

const TokenSchema: any = new Schema({
    _id: { type: Schema.Types.String, default: uuidv4 },
    hash: { type:Schema.Types.String, required: true },
    expires: { type:Schema.Types.Number, required: true },
    payload: { type:Schema.Types.Mixed, required: true },
    blackListed: { type:Schema.Types.Boolean }
}, { timestamps: true });

TokenSchema.loadClass(Token);

export default TokenSchema;
