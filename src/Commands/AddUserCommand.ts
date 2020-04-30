import UserRepPayload from "../Payloads/Users/UserRepPayload";
import UserCommandRepRequest from "./Requests/UserCommandRepRequest";
import logger from "../Lib/Logger";
import commander from "commander";
import UserServiceFactory from "../Services/Factories/UserServiceFactory";

const AddUserCommand = new commander.Command('addUser');

AddUserCommand
    .version('0.0.1')
    .description('Add user to the system')
    .option('-e, --email <email>','Email of user')
    .option('-fn, --firstName <firstName>','First Name of the user')
    .option('-ln, --lastName <lastName>','Last Name of the user')
    .option('-p, --password <password>','Password of the user')
    .action(async (env) => {
            const userService = UserServiceFactory.create();

            const userCommandRepRequest: UserRepPayload = new UserCommandRepRequest(env);
            const user = await userService.save(userCommandRepRequest);

            if (user)
            {
                    logger.info('User created successfully.');
            }
    });

export default AddUserCommand;