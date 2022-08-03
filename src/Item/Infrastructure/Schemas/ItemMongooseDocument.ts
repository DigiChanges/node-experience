import { Document } from 'mongoose';
import IItemDomain from '../../Domain/Entities/IItemDomain';

type ItemMongooseDocument = Document & IItemDomain

export default ItemMongooseDocument;
