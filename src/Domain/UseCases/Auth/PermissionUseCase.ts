import Permissions from "../../../../config/Permissions";
import _ from "lodash";

class PermissionUseCase
{
    async handle()
    {
        return _.flatMap(Permissions.permissions());
    }
}

export default PermissionUseCase;
