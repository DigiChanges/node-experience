import { loggerCli } from "../../Lib/Logger";
import commander from "commander";
import RoleRepPayload from "../../InterfaceAdapters/Payloads/Roles/RoleRepPayload";
import RoleCommandRepRequest from "./Requests/RoleUserCommandRepRequest";
import RoleServiceFactory from "../../Domain/Services/Factories/RoleServiceFactory";

const AddRoleCommand = new commander.Command('addRole');

AddRoleCommand
    .version('0.0.1')
    .description('Add role to the system')
    .option('-e, --name <name>','Name of the role')
    .option('-fn, --slug <slug>','Slug of the role')
    .action(async (env: any) => {
        const roleService = RoleServiceFactory.create();

        const roleCommandRepRequest: RoleRepPayload = new RoleCommandRepRequest(env);
        const role = await roleService.save(roleCommandRepRequest);

        if (role)
        {
            loggerCli.info('Role created successfully.');
        }
    });

export default AddRoleCommand;