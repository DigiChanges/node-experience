import * as mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import FileVersion from '../../Domain/Entities/FileVersion';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';

export type FileVersionMongooseDocument = Document & IFileVersionDomain;

const FileVersionSchema: any = new mongoose.Schema({
    _id: { type: String, default: randomUUID },
    name: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    path: { type: String },
    extension: { type: String },
    size: { type: Number, required: true },
    version: { type: Number, required: true },
    isPublic: { type: Boolean, default: false },
    isOptimized: { type: Boolean, default: false },
    file: { type: String, ref: 'File' }
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
