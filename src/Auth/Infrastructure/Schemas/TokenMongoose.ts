import { Schema, Document } from 'mongoose';
import { uuid } from '@deepkit/type';
import Token from '../../Domain/Entities/Token';
import ITokenDomain from '../../Domain/Entities/ITokenDomain';

export type TokenMongooseDocument = Document & ITokenDomain;

const TokenSchema: any = new Schema({
    _id: { type: Schema.Types.String, default: uuid },
    hash: { type:Schema.Types.String, required: true },
    expires: { type:Schema.Types.Number, required: true },
    payload: { type:Schema.Types.Mixed, required: true },
    blackListed: { type:Schema.Types.Boolean }
}, { timestamps: true });

TokenSchema.loadClass(Token);

export default TokenSchema;
