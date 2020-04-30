import ICriteria from "../../Lib/Contracts/ICriteria";
import IdPayload from "../../Payloads/Defaults/IdPayload";
import UserAssignRolePayload from "../../Payloads/Users/UserAssignRolePayload";
import UserUpdatePayload from "../../Payloads/Users/UserUpdatePayload";
import UserRepPayload from "../../Payloads/Users/UserRepPayload";

interface IUserService
{
    save (payload: UserRepPayload): any;
    update (payload: UserUpdatePayload): any;
    list (criteria: ICriteria): any;
    getOne (payload: IdPayload): any;
    remove (payload: IdPayload): any;
    assignRole (payload: UserAssignRolePayload): any;
}

export default IUserService;