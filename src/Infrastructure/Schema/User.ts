import {Schema} from "mongoose";
import User from "../../Domain/Entities/User";

const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    permissions: {type: Array, required: true},
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }],
    enable: {type: Boolean, required: true},
    isSuperAdmin: {type: Boolean, required: true},
    confirmationToken: {type: String},
    passwordRequestedAt: {type: Date},
}, {timestamps: true});

UserSchema.loadClass(User);

export default UserSchema;