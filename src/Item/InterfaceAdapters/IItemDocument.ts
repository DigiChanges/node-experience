import {Document} from 'mongoose';
import IItemSchema from './IItemSchema';
import Item from '../Domain/Entities/Item';

interface IItemDocument extends Document<IItemSchema, never, Item> {}

export default IItemDocument;
