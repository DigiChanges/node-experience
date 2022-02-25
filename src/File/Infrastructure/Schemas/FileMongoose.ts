import { Schema } from 'mongoose';
import File from '../../Domain/Entities/File';
import { v4 as uuidv4 } from 'uuid';

const FileSchema: any = new Schema({
    _id: { type: Schema.Types.String, default: uuidv4 },
    name: { type: Schema.Types.String, required: true },
    originalName: { type: Schema.Types.String, required: true },
    mimeType: { type: Schema.Types.String, required: true },
    path: { type: Schema.Types.String },
    extension: { type: Schema.Types.String, required: true },
    size: { type: Schema.Types.Number, required: true },
    version: { type: Schema.Types.Number, required: true },
    isPublic: { type: Schema.Types.Boolean, default: false }
}, { timestamps: true });

FileSchema.index({
    name: 1,
    path: 1,
    isPublic: 1
},
{
    unique: true,
    name:'name_path_private_index'
});
FileSchema.loadClass(File);

export default FileSchema;
