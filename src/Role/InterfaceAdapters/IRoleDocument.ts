import {Document} from 'mongoose';
import IRoleDomain from './IRoleDomain';

interface IRoleDocument extends Document, IRoleDomain {}

export default IRoleDocument;
