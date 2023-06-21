import MainConfig from '../../../Config/MainConfig';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Shared/Application/Http/KoaResponder';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import RoleTransformer from '../Transformers/RoleTransformer';
import ResponseMessageEnum from '../../../Shared/Domain/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import RoleRepPayload from '../../Domain/Payloads/Role/RoleRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import RoleUpdatePayload from '../../Domain/Payloads/Role/RoleUpdatePayload';
import SaveRoleUseCase from '../../Domain/UseCases/Role/SaveRoleUseCase';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import RoleFilter from '../Criterias/RoleFilter';
import RoleSort from '../Criterias/RoleSort';
import Pagination from '../../../Shared/Presentation/Shared/Pagination';
import ListRolesUseCase from '../../Domain/UseCases/Role/ListRolesUseCase';
import GetRoleUseCase from '../../Domain/UseCases/Role/GetRoleUseCase';
import UpdateRoleUseCase from '../../Domain/UseCases/Role/UpdateRoleUseCase';
import RemoveRoleUseCase from '../../Domain/UseCases/Role/RemoveRoleUseCase';

class RoleKoaController
{
    private static responder: KoaResponder = new KoaResponder();
    private static config = MainConfig.getInstance().getConfig().statusCode;

    static async save(ctx: any)
    {
        const useCase = new SaveRoleUseCase();
        const role: IRoleDomain = await useCase.handle(ctx.request.body as RoleRepPayload);

        void await RoleKoaController.responder.send(role, ctx, RoleKoaController.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    static async list(ctx: any)
    {
        const { url, query } = ctx.request;

        const requestCriteria: ICriteria = new RequestCriteria(
            {
                filter: new RoleFilter(query),
                sort: new RoleSort(query),
                pagination: new Pagination(query, url)
            });

        const useCase = new ListRolesUseCase();
        const paginator: IPaginator = await useCase.handle(requestCriteria);

        await RoleKoaController.responder.send(paginator, ctx, RoleKoaController.config['HTTP_OK'], new RoleTransformer());
    }

    static async getOne(ctx: any)
    {
        const useCase = new GetRoleUseCase();
        const role: IRoleDomain = await useCase.handle(ctx.params as IdPayload);

        void await RoleKoaController.responder.send(role, ctx, RoleKoaController.config['HTTP_OK'], new RoleTransformer());
    }

    static async update(ctx: any)
    {
        const data: RoleUpdatePayload = {
            id: ctx.params.id,
            ...ctx.request.body
        };

        const useCase = new UpdateRoleUseCase();
        const role: IRoleDomain = await useCase.handle(data);

        void await RoleKoaController.responder.send(role, ctx, RoleKoaController.config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static  async remove(ctx: any)
    {
        const { id: name } = ctx.params;

        const useCase = new RemoveRoleUseCase();
        await useCase.handle(name);

        void await RoleKoaController.responder.send(ctx.params, ctx, RoleKoaController.config['HTTP_OK'], new DefaultMessageTransformer(ResponseMessageEnum.DELETED));
    }
}
export default RoleKoaController;
