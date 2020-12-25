#!/usr/bin/env ts-node

import {exit} from "shelljs";
import commander from 'commander';
import dotenv from 'dotenv';
dotenv.config(); // Need before get config

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y'

import {loggerCli} from "./Infrastructure/Shared/Logger";

import AddUserRoleCommand from "./Presentation/Commands/AddUserRoleCommand";
import AddUserCommand from "./Presentation/Commands/AddUserCommand";
import AddRoleCommand from "./Presentation/Commands/AddRoleCommand";
import CreateVapID from "./Presentation/Commands/CreateVapID";

import {validateEnv} from "../config/validateEnv";
import DatabaseFactory from "./Infrastructure/Factories/DatabaseFactory";
import AssignRoleToUserCommand from "./Presentation/Commands/AssingRoleToUserCommand";
import SyncRolesPermissionCommand from "./Presentation/Commands/SyncRolesPermissionCommand";

(async () => {
    try {
        // Initialize configuration
        validateEnv();

        const databaseFactory = new DatabaseFactory();

        const createConnection = databaseFactory.create();
        createConnection.initConfig();

        await createConnection.create();

        const program = commander.program;

        program.addCommand(AddUserRoleCommand);
        program.addCommand(AddUserCommand);
        program.addCommand(AddRoleCommand);
        program.addCommand(AssignRoleToUserCommand);
        program.addCommand(CreateVapID);
        program.addCommand(SyncRolesPermissionCommand);

        await program.parseAsync(process.argv);
        exit();
    }
    catch (error)
    {
        // TODO: Add exception mapping to handle errors like server express
        loggerCli.info('Error while connecting to the database', error);
        loggerCli.info(error.message);
        exit();
    }
})();
