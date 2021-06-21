import {inject} from 'inversify';
import {NextFunction, Request, Response} from 'express';
import {controller, httpDelete, httpGet, httpPost, httpPut, request, response, next} from 'inversify-express-utils';
import {IPaginator, StatusCode} from '@digichanges/shared-experience';

import {TYPES} from '../../../types';
import Responder from '../../../App/Presentation/Shared/Responder';
import RoleTransformer from '../Transformers/RoleTransformer';
import RoleRepRequest from '../Requests/RoleRepRequest';
import IdRequest from '../../../App/Presentation/Requests/IdRequest';
import RoleRequestCriteria from '../Requests/RoleRequestCriteria';
import RoleUpdateRequest from '../Requests/RoleUpdateRequest';
import AuthorizeMiddleware from '../../../Auth/Presentation/Middlewares/AuthorizeMiddleware';
import Permissions from '../../../Config/Permissions';

import SaveRoleUseCase from '../../Domain/UseCases/SaveRoleUseCase';
import ListRolesUseCase from '../../Domain/UseCases/ListRolesUseCase';
import GetRoleUseCase from '../../Domain/UseCases/GetRoleUseCase';
import RemoveRoleUseCase from '../../Domain/UseCases/RemoveRoleUseCase';
import IRoleDomain from '../../InterfaceAdapters/IRoleDomain';
import UpdateRoleUseCase from '../../Domain/UseCases/UpdateRoleUseCase';
import ValidatorRequest from '../../../App/Presentation/Shared/Express/ValidatorRequest';

@controller('/api/roles')
class RoleHandler
{
    @inject(TYPES.Responder)
    private responder: Responder;

    @httpPost('/', AuthorizeMiddleware(Permissions.ROLES_SAVE))
    public async save(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new RoleRepRequest(req);
        await ValidatorRequest.handle(_request);

        const saveRoleUseCase = new SaveRoleUseCase();
        const role: IRoleDomain = await saveRoleUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }

    @httpGet('/', AuthorizeMiddleware(Permissions.ROLES_LIST))
    public async list(@request() req: Request, @response() res: Response)
    {
        const _request = new RoleRequestCriteria(req);
        await ValidatorRequest.handle(_request);

        const listRolesUseCase = new ListRolesUseCase();
        const paginator: IPaginator = await listRolesUseCase.handle(_request);

        await this.responder.paginate(paginator, req, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpGet('/:id', AuthorizeMiddleware(Permissions.ROLES_SHOW))
    public async getOne(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const getRoleUseCase = new GetRoleUseCase();
        const role: IRoleDomain = await getRoleUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_OK, new RoleTransformer());
    }

    @httpPut('/:id', AuthorizeMiddleware(Permissions.ROLES_UPDATE))
    public async update(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new RoleUpdateRequest(req);
        await ValidatorRequest.handle(_request);

        const updateRoleUseCase = new UpdateRoleUseCase();
        const role: IRoleDomain = await updateRoleUseCase.handle(_request);

        this.responder.send(role, req, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }

    @httpDelete('/:id', AuthorizeMiddleware(Permissions.ROLES_DELETE))
    public async remove(@request() req: Request, @response() res: Response, @next() nex: NextFunction)
    {
        const _request = new IdRequest(req);
        await ValidatorRequest.handle(_request);

        const removeRoleUseCase = new RemoveRoleUseCase();
        const data = await removeRoleUseCase.handle(_request);

        this.responder.send(data, req, res, StatusCode.HTTP_CREATED, new RoleTransformer());
    }
}

export default RoleHandler;
