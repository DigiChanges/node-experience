#!/usr/bin/env ts-node

import {exit} from "shelljs";
import {ConnectionOptions, createConnection} from "typeorm";
import commander from 'commander';
import Config from 'config';

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y'

import {loggerCli} from "./Infrastructure/Shared/Logger";

import AddUserRoleCommand from "./Presentation/Commands/AddUserRoleCommand";
import AddUserCommand from "./Presentation/Commands/AddUserCommand";
import AddRoleCommand from "./Presentation/Commands/AddRoleCommand";

const db: ConnectionOptions = Config.get('dbConfig');

createConnection(db)
    .then(async ()=> {

        const program = commander.program;

        program.addCommand(AddUserRoleCommand);
        program.addCommand(AddUserCommand);
        program.addCommand(AddRoleCommand);

        await program.parseAsync(process.argv);
        exit();

    })
    .catch( (error) => {
            loggerCli.info('Error');
            loggerCli.info(error.message);
            exit();
    });
