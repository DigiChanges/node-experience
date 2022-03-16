import { Document } from 'mongoose';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';

interface IRoleDocument extends Document, IRoleDomain {}

export default IRoleDocument;
