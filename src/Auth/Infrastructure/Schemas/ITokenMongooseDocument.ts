import { Document } from 'mongoose';
import ITokenDomain from '../../Domain/Entities/ITokenDomain';

interface ITokenMongooseDocument extends Document, ITokenDomain {}

export default ITokenMongooseDocument;
