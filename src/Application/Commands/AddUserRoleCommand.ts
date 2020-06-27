import RoleRepPayload from "../../InterfaceAdapters/Payloads/Roles/RoleRepPayload";
import RoleCommandRepRequest from "./Requests/RoleUserCommandRepRequest";
import UserRepPayload from "../../InterfaceAdapters/Payloads/Users/UserRepPayload";
import UserCommandRepRequest from "./Requests/UserCommandRepRequest";
import { loggerCli } from "../../Lib/Logger";
import commander from "commander";
import UserServiceFactory from "../../Domain/Services/Factories/UserServiceFactory";
import RoleServiceFactory from "../../Domain/Services/Factories/RoleServiceFactory";

const AddUserRoleCommand = new commander.Command('addUserRole');

AddUserRoleCommand
    .version('0.0.1')
    .description('Add user, role and assign it')
    .option('-e, --role <role>','Name of the role')
    .option('-e, --email <email>','Email of user')
    .option('-fn, --firstName <firstName>','First Name of the user')
    .option('-ln, --lastName <lastName>','Last Name of the user')
    .option('-p, --password <password>','Password of the user')
    .option('-isa, --isSuperAdmin <isSuperAdmin>','Set if User is Super Admin')
    .action(async (env: any) => {
        const userService = UserServiceFactory.create();
        const roleService = RoleServiceFactory.create();

        const roleCommandRepRequest: RoleRepPayload = new RoleCommandRepRequest(env);
        const role = await roleService.save(roleCommandRepRequest);

        const userCommandRepRequest: UserRepPayload = new UserCommandRepRequest(env, role);
        const user = await userService.save(userCommandRepRequest);

        if (user && role)
        {
                loggerCli.info('User and Role created successfully.');
        }
    });

export default AddUserRoleCommand;