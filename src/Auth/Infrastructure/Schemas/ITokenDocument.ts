import { Document } from 'mongoose';
import ITokenDomain from '../../Domain/Entities/ITokenDomain';

interface ITokenDocument extends Document, ITokenDomain {}

export default ITokenDocument;
