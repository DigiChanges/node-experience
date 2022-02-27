import { Document } from 'mongoose';
import IFileDomain from '../../Domain/Entities/IFileDomain';

interface IFileDocument extends Document, IFileDomain {}

export default IFileDocument;
