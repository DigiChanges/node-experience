import {Document} from 'mongoose';
import ITokenDomain from './ITokenDomain';

interface ITokenDocument extends Document, ITokenDomain {}

export default ITokenDocument;
