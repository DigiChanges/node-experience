import { Document } from 'mongoose';
import IUserDomain from '../../Domain/Entities/IUserDomain';

interface IUserDocument extends Document, IUserDomain {}

export default IUserDocument;
