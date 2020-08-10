import {Schema} from "mongoose";
import Role from "../../Domain/Entities/Role";

const RoleSchema = new Schema({
    name: {type:String, required: true},
    slug: {type:String, required: true, unique: true},
}, {timestamps: true});

RoleSchema.loadClass(Role);

export default RoleSchema;