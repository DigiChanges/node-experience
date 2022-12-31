import { Document } from 'mongoose';
import IProductDomain from '../../Domain/Entities/IProductDomain';

type ProductMongooseDocument = Document & IProductDomain

export default ProductMongooseDocument;
