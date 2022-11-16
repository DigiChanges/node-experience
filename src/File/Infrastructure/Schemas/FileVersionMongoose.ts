import { Schema } from 'mongoose';
import FileVersion from '../../Domain/Entities/FileVersion';
import { uuid } from '@deepkit/type';

const FileVersionSchema: any = new Schema({
    _id: { type: Schema.Types.String, default: uuid },
    name: { type: Schema.Types.String, required: true },
    originalName: { type: Schema.Types.String, required: true },
    mimeType: { type: Schema.Types.String, required: true },
    path: { type: Schema.Types.String },
    extension: { type: Schema.Types.String },
    size: { type: Schema.Types.Number, required: true },
    version: { type: Schema.Types.Number, required: true },
    isPublic: { type: Schema.Types.Boolean, default: false },
    isOptimized: { type: Schema.Types.Boolean, default: false },
    file: { type: Schema.Types.String, ref: 'File' }
}, { timestamps: true });

FileVersionSchema.index({
    name: 1,
    path: 1,
    isPublic: 1
},
{
    unique: true,
    name:'name_path_private_index'
});
FileVersionSchema.loadClass(FileVersion);

export default FileVersionSchema;
