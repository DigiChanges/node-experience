import MainConfig from '../../../Config/MainConfig';
import IPaginator from '../../../Shared/Infrastructure/Orm/IPaginator';
import KoaResponder from '../../../Main/Presentation/Utils/KoaResponder';
import IRoleDomain from '../../Domain/Entities/IRoleDomain';
import RoleTransformer from '../Transformers/RoleTransformer';
import ResponseMessageEnum from '../../../Shared/Presentation/Enum/ResponseMessageEnum';
import DefaultMessageTransformer from '../../../Shared/Presentation/Transformers/DefaultMessageTransformer';
import RoleRepPayload from '../../Domain/Payloads/Role/RoleRepPayload';
import IdPayload from '../../../Shared/Presentation/Requests/IdPayload';
import RoleUpdatePayload from '../../Domain/Payloads/Role/RoleUpdatePayload';
import SaveRoleUseCase from '../../Domain/UseCases/Role/SaveRoleUseCase';
import ICriteria from '../../../Shared/Presentation/Requests/ICriteria';
import RequestCriteria from '../../../Shared/Presentation/Requests/RequestCriteria';
import RoleFilter from '../Criterias/RoleFilter';
import RoleSort from '../Criterias/RoleSort';
import Pagination from '../../../Shared/Utils/Pagination';
import ListRolesUseCase from '../../Domain/UseCases/Role/ListRolesUseCase';
import GetRoleUseCase from '../../Domain/UseCases/Role/GetRoleUseCase';
import UpdateRoleUseCase from '../../Domain/UseCases/Role/UpdateRoleUseCase';
import RemoveRoleUseCase from '../../Domain/UseCases/Role/RemoveRoleUseCase';

const responder: KoaResponder = new KoaResponder();
const config = MainConfig.getInstance().getConfig().statusCode;

class RoleKoaController
{
    static async save(ctx: any)
    {
        const useCase = new SaveRoleUseCase();
        const role: IRoleDomain = await useCase.handle(ctx.request.body as RoleRepPayload);

        await responder.send(role, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
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

        await responder.send(paginator, ctx, config['HTTP_OK'], new RoleTransformer());
    }

    static async getOne(ctx: any)
    {
        const useCase = new GetRoleUseCase();
        const role: IRoleDomain = await useCase.handle(ctx.params as IdPayload);

        await responder.send(role, ctx, config['HTTP_OK'], new RoleTransformer());
    }

    static async update(ctx: any)
    {
        const data: RoleUpdatePayload = {
            id: ctx.params.id,
            ...ctx.request.body
        };

        const useCase = new UpdateRoleUseCase();
        const role: IRoleDomain = await useCase.handle(data);

        await responder.send(role, ctx, config['HTTP_CREATED'], new DefaultMessageTransformer(ResponseMessageEnum.UPDATED));
    }

    static  async remove(ctx: any)
    {
        const { id: name } = ctx.params;

        const useCase = new RemoveRoleUseCase();
        await useCase.handle(name);

        await responder.send(ctx.params, ctx, config['HTTP_OK'], new DefaultMessageTransformer(ResponseMessageEnum.DELETED));
    }
}
export default RoleKoaController;
