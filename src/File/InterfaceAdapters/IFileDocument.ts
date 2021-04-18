import {Document} from 'mongoose';
import IFileDomain from './IFileDomain';

interface IFileDocument extends Document, IFileDomain {}

export default IFileDocument;
