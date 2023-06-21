import MainConfig from '../../../Config/MainConfig';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import ItemTransformer from '../Transformers/ItemTransformer';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import ItemRepPayload from '../../Domain/Payloads/ItemRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import ItemUpdatePayload from '../../Domain/Payloads/ItemUpdatePayload';
import SaveItemUseCase from '../../Domain/UseCases/SaveItemUseCase';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import ItemFilter from '../Criterias/ItemFilter';
import ItemSort from '../Criterias/ItemSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import ListItemsUseCase from '../../Domain/UseCases/ListItemsUseCase';
import GetItemUseCase from '../../Domain/UseCases/GetItemUseCase';
import UpdateItemUseCase from '../../Domain/UseCases/UpdateItemUseCase';
import RemoveItemUseCase from '../../Domain/UseCases/RemoveItemUseCase';

const responder: KoaResponder = new KoaResponder();
const config = MainConfig.getInstance().getConfig().statusCode;

class ItemController
{
    static async save(ctx: any): Promise<void>
    {
        const payload: ItemRepPayload = {
            ...ctx.request.body
        };

        const useCase = new SaveItemUseCase();
        const item = await useCase.handle(payload);

        void await responder.send(item, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    static async list(ctx: any): Promise<void>
    {
        const { url, query } = ctx.request;

        const requestCriteria: ICriteria = new RequestCriteria({
            filter: new ItemFilter(query),
            sort: new ItemSort(query),
            pagination: new Pagination(query, url)
        });

        const useCase = new ListItemsUseCase();
        const paginator: IPaginator = await useCase.handle(requestCriteria);

        await responder.paginate(paginator, ctx, config['HTTP_OK'], new ItemTransformer());
    }

    static async show(ctx: any): Promise<void>
    {
        const useCase = new GetItemUseCase();
        const item = await useCase.handle(ctx.params as IdPayload);

        void await responder.send(item, ctx, config['HTTP_OK'], new ItemTransformer());
    }

    static async update(ctx: any): Promise<void>
    {
        const payload: ItemUpdatePayload = {
            id: ctx.params.id,
            ...ctx.request.body
        };

        const useCase = new UpdateItemUseCase();
        const item = await useCase.handle(payload);

        void await responder.send(item, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static async remove(ctx: any): Promise<void>
    {
        const useCase = new RemoveItemUseCase();
        const item = await useCase.handle(ctx.params as IdPayload);

        void await responder.send(item, ctx, config['HTTP_CREATED'], new ItemTransformer());
    }
}

export default ItemController;