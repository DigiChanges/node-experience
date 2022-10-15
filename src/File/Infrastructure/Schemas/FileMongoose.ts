import { Schema } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import File from '../../Domain/Entities/File';

const FileMongoose: any = new Schema({
    _id: { type: Schema.Types.String, default: uuidV4 },
    currentVersion: { type: Schema.Types.Number }
}, { timestamps: true });

FileMongoose.loadClass(File);

export default FileMongoose;
