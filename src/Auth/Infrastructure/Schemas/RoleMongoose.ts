import { Schema } from 'mongoose';
import Role from '../../Domain/Entities/Role';
import { uuid } from '@deepkit/type';

const RoleSchema: any = new Schema({
    _id: { type: String, default: uuid },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    enable: { type: Boolean, default: true },
    ofSystem: { type: Boolean, default: false },
    permissions: { type: Array, required: true }
}, { timestamps: true });

RoleSchema.loadClass(Role);

export default RoleSchema;
