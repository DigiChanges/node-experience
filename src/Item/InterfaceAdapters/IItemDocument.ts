import { Document } from 'mongoose';
import IItemDomain from './IItemDomain';

interface IItemDocument extends Document, IItemDomain {}

export default IItemDocument;
