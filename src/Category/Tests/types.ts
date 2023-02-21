import { IBodyResponse } from '../../Shared/InterfaceAdapters/Tests/IBodyResponse';
import { IFetchResponse } from '../../Shared/InterfaceAdapters/Tests/IFetchResponse';
import ICategoryTransformer from '../Presentation/Transformers/ICategoryTransformer';

interface ICategoryBody extends IBodyResponse
{
    data: ICategoryTransformer;
}

interface IListCategoryBody extends IBodyResponse
{
    data: ICategoryTransformer[];
}

export interface ICategoryResponse extends IFetchResponse
{
    body: ICategoryBody;
}

export interface IListCategorysResponse extends IFetchResponse
{
    body: IListCategoryBody;
}
