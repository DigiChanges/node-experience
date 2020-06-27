import ICriteria from "../../Lib/Contracts/ICriteria";
import IdPayload from "../Payloads/Defaults/IdPayload";
import RoleRepPayload from "../Payloads/Roles/RoleRepPayload";
import RoleUpdatePayload from "../Payloads/Roles/RoleUpdatePayload";

interface IRoleService
{
    save (payload: RoleRepPayload): any;
    update (payload: RoleUpdatePayload): any;
    list (criteria: ICriteria): any;
    getOne (payload: IdPayload): any;
    remove (payload: IdPayload): any;
}

export default IRoleService;