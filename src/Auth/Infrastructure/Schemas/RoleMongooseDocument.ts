import { Document } from 'mongoose';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';

type RoleMongooseDocument = Document & IRoleDomain;

export default RoleMongooseDocument;
