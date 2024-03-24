import FastifyResponder from '../../../Main/Presentation/Utils/FastifyResponder';
import SyncPermissionsUseCase from '../../Domain/UseCases/Auth/SyncPermissionsUseCase';
import IGroupPermission from '../../../Config/IGroupPermission';
import PermissionsTransformer from '../Transformers/PermissionsTransformer';
import PermissionUseCase from '../../Domain/UseCases/Auth/PermissionUseCase';
import { StatusCode } from '../../../Main/Presentation/Application/StatusCode';

const responder: FastifyResponder = new FastifyResponder();

class AuthFastifyController
{
    static async getPermissions(request: any, reply: any)
    {
        const useCase = new PermissionUseCase();
        const payload: IGroupPermission[] = useCase.handle();

        await responder.send(payload, reply, StatusCode.HTTP_OK, new PermissionsTransformer());
    }

    static async syncRolesPermissions(request: any, reply: any)
    {
        const useCase = new SyncPermissionsUseCase();
        await useCase.handle();

        await responder.send({ message: 'Sync Successfully' }, reply, StatusCode.HTTP_CREATED);
    }
}

export default AuthFastifyController;
