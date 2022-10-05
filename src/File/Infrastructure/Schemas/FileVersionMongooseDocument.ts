import { Document } from 'mongoose';
import IFileVersionDomain from '../../Domain/Entities/IFileVersionDomain';

type FileVersionMongooseDocument = Document & IFileVersionDomain;

export default FileVersionMongooseDocument;
