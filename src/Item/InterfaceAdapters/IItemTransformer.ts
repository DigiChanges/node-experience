import IUserMinimalDataTransformer from '../../User/InterfaceAdapters/IUserMinimalDataTransformer';

interface IItemTransformer
{
    id: string;
    name: string;
    type: number;
    createdBy: IUserMinimalDataTransformer;
    lastModifiedBy: IUserMinimalDataTransformer;
    createdAt: number;
    updatedAt: number;
}

export default IItemTransformer;
