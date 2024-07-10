import FastifyResponder from '../../../Main/Presentation/Utils/FastifyResponder';
import SyncPermissionsUseCase from '../../Domain/UseCases/SyncPermissionsUseCase';
import IGroupPermission from '../../../Config/IGroupPermission';
import PermissionsTransformer from '../Transformers/PermissionsTransformer';
import PermissionUseCase from '../../Domain/UseCases/PermissionUseCase';
import { StatusCode } from '../../../Main/Presentation/Application/StatusCode';
import DependencyInjector from '../../../Shared/DI/DependencyInjector';

const responder: FastifyResponder = new FastifyResponder();

class AuthFastifyController
{
    static async getPermissions(request: any, reply: any)
    {
        const useCase = DependencyInjector.inject<PermissionUseCase>('PermissionUseCase');
        const payload: IGroupPermission[] = useCase.handle();

        await responder.send(payload, reply, StatusCode.HTTP_OK, new PermissionsTransformer());
    }

    static async syncRolesPermissions(request: any, reply: any)
    {
        const useCase = DependencyInjector.inject<SyncPermissionsUseCase>('SyncPermissionsUseCase');
        await useCase.handle();

        await responder.send({ message: 'Sync Successfully' }, reply, StatusCode.HTTP_CREATED);
    }
}

export default AuthFastifyController;
