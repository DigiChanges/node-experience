import {Schema} from "mongoose";
import User from "../../Domain/Entities/User";

const UserSchema = new Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    roles: [{ type: Schema.Types.ObjectId, ref: 'Role' }]
}, {timestamps: true});

UserSchema.loadClass(User);

export default UserSchema;