import {Document} from 'mongoose';
import IUserDomain from './IUserDomain';

interface IUserDocument extends Document, IUserDomain {}

export default IUserDocument;
