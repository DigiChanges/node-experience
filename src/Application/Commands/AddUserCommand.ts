import UserRepPayload from "../../InterfaceAdapters/Payloads/Users/UserRepPayload";
import UserCommandRepRequest from "./Requests/UserCommandRepRequest";
import { loggerCli } from "../../Lib/Logger";
import commander from "commander";
import UserServiceFactory from "../../Domain/Services/Factories/UserServiceFactory";

const AddUserCommand = new commander.Command('addUser');

AddUserCommand
    .version('0.0.1')
    .description('Add user to the system')
    .option('-e, --email <email>','Email of user')
    .option('-fn, --firstName <firstName>','First Name of the user')
    .option('-ln, --lastName <lastName>','Last Name of the user')
    .option('-p, --password <password>','Password of the user')
    .option('-isa, --isSuperAdmin <isSuperAdmin>','Set if User is Super Admin')
    .action(async (env) => {
            const userService = UserServiceFactory.create();

            const userCommandRepRequest: UserRepPayload = new UserCommandRepRequest(env);
            const user = await userService.save(userCommandRepRequest);

            if (user)
            {
                loggerCli.info('User created successfully.');
            }
    });

export default AddUserCommand;