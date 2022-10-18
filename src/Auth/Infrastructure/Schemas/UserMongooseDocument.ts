import { Document } from 'mongoose';
import IUserDomain from '../../Domain/Entities/IUserDomain';

type UserMongooseDocument = Document & IUserDomain

export default UserMongooseDocument;
