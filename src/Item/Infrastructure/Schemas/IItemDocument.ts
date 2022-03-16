import { Document } from 'mongoose';
import IItemDomain from '../../Domain/Entities/IItemDomain';

interface IItemDocument extends Document, IItemDomain {}

export default IItemDocument;
