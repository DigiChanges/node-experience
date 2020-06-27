import ICriteria from "../../Lib/Contracts/ICriteria";
import IdPayload from "../Payloads/Defaults/IdPayload";
import UserAssignRolePayload from "../Payloads/Users/UserAssignRolePayload";
import UserUpdatePayload from "../Payloads/Users/UserUpdatePayload";
import UserRepPayload from "../Payloads/Users/UserRepPayload";
import ChangeMyPasswordPayload from "../Payloads/Users/ChangeMyPasswordPayload";
import ChangeUserPasswordPayload from "../Payloads/Users/ChangeUserPasswordPayload";
import CheckUserRolePayload from "../Payloads/Auxiliars/CheckUserRolePayload";
import IUser from "../IEntities/IUser";

interface IUserService
{
    save (payload: UserRepPayload): any;
    update (payload: UserUpdatePayload): any;
    list (criteria: ICriteria): any;
    getOne (payload: IdPayload): any;
    remove (payload: IdPayload): any;
    assignRole (payload: UserAssignRolePayload, user: IUser): any;
    changeMyPassword(payload: ChangeMyPasswordPayload): any;
    changeUserPassword(payload: ChangeUserPasswordPayload): any;
    checkIfUserHasRole(payload: CheckUserRolePayload): Promise<boolean>;
}

export default IUserService;