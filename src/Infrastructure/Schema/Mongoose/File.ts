import {Schema} from 'mongoose';
import File from '../../../Domain/Entities/File';
import {v4 as uuidv4} from 'uuid';

const FileSchema: any = new Schema({
    _id: {type: String, default: uuidv4},
    name: {type:String, required: true},
    originalName: {type:String, required: true},
    mimeType: {type:String, required: true},
    path: {type:String},
    extension: {type:String, required: true},
    size: {type:Number, required: true},
    version: {type:Number, required:true}
}, {timestamps: true});

FileSchema.loadClass(File);

export default FileSchema;
