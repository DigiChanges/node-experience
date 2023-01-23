import { Schema, Document } from 'mongoose';
import User from '../../Domain/Entities/User';
import { uuid } from '@deepkit/type';
import IUserDomain from '../../Domain/Entities/IUserDomain';

export type UserMongooseDocument = Document & IUserDomain;

const UserSchema = new Schema({
    _id: { type: String, default: uuid },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthday: { type: String },
    documentType: { type: String, required: true },
    documentNumber: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    permissions: { type: Array, required: true },
    roles: [{ type: Schema.Types.String, ref: 'Role' }],
    enable: { type: Boolean, default: true },
    verify: { type: Boolean, default: false },
    isSuperAdmin: { type: Boolean, default: false },
    passwordRequestedAt: { type: Date }
}, { timestamps: true });

UserSchema.loadClass(User);

export default UserSchema;
