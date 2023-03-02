import IUserMinimalDataTransformer from '../../../Auth/Presentation/Transformers/IUserMinimalDataTransformer';

interface ICategoryTransformer {
  id: string;
  title: string;
  enable: boolean;
  createdBy: IUserMinimalDataTransformer;
  lastModifiedBy: IUserMinimalDataTransformer;
  createdAt: number;
  updatedAt: number;
}

export default ICategoryTransformer;
