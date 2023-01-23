import { Schema, Document } from 'mongoose';
import { uuid } from '@deepkit/type';
import File from '../../Domain/Entities/File';
import IFileDomain from '../../Domain/Entities/IFileDomain';

export type FileMongooseDocument = Document & IFileDomain;

const FileMongoose: any = new Schema({
    _id: { type: Schema.Types.String, default: uuid },
    currentVersion: { type: Schema.Types.Number }
}, { timestamps: true });

FileMongoose.loadClass(File);

export default FileMongoose;
