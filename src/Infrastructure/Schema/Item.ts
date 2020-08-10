import {Schema} from "mongoose";
import Item from "../../Domain/Entities/Item";

const ItemSchema = new Schema({
    name: {type:String, required: true},
    type: {type:Number, required: true},
}, {timestamps: true});

ItemSchema.loadClass(Item);

export default ItemSchema;