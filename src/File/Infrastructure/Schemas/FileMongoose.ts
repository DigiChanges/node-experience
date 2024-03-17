import * as mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import File from '../../Domain/Entities/File';
import IFileDomain from '../../Domain/Entities/IFileDomain';

export type FileMongooseDocument = Document & IFileDomain;

const FileMongoose: any = new mongoose.Schema<File>({
    _id: { type: String, default: randomUUID },
    currentVersion: { type: Number }
}, { timestamps: true });

FileMongoose.loadClass(File);

export default FileMongoose;
