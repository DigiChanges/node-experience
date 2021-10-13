import { Schema } from 'mongoose';
import User from '../../Domain/Entities/User';
import { v4 as uuidv4 } from 'uuid';

const UserSchema: any = new Schema({
    _id: { type: String, default: uuidv4 },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    birthday: { type: String },
    document_type: { type: String, required: true },
    document_number: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    permissions: { type: Array, required: true },
    roles: [{ type: Schema.Types.String, ref: 'Role' }],
    enable: { type: Boolean, required: true },
    is_super_admin: { type: Boolean, required: true },
    confirmation_token: { type: String },
    password_requested_at: { type: Date }
}, { timestamps: true });

UserSchema.loadClass(User);

export default UserSchema;
