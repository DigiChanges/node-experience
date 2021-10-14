import { Schema } from 'mongoose';
import Role from '../../Domain/Entities/Role';
import { v4 as uuidv4 } from 'uuid';

const RoleSchema: any = new Schema({
    _id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    enable: { type: Boolean, required: true },
    ofSystem: { type: Boolean, default: false },
    permissions: { type: Array, required: true }
}, { timestamps: true });

RoleSchema.loadClass(Role);

export default RoleSchema;
