import { Schema } from 'mongoose';
import { uuid } from '@deepkit/type';
import File from '../../Domain/Entities/File';

const FileMongoose: any = new Schema({
    _id: { type: Schema.Types.String, default: uuid },
    currentVersion: { type: Schema.Types.Number }
}, { timestamps: true });

FileMongoose.loadClass(File);

export default FileMongoose;
