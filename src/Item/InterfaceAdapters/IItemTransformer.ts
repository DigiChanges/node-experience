import IUserMinimalDataTransformer from '../../User/InterfaceAdapters/IUserMinimalDataTransformer';

interface IItemTransformer
{
    id: string;
    name: string;
    type: number;
    created_by: IUserMinimalDataTransformer;
    last_modified_by: IUserMinimalDataTransformer;
    createdAt: number;
    updatedAt: number;
}

export default IItemTransformer;
