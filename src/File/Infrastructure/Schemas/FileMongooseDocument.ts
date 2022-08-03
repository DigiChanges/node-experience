import { Document } from 'mongoose';
import IFileDomain from '../../Domain/Entities/IFileDomain';

type FileMongooseDocument = Document & IFileDomain;

export default FileMongooseDocument;
