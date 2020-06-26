#!/usr/bin/env ts-node

import {exit} from "shelljs";

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y'

import {ConnectionOptions, createConnection} from "typeorm";
import commander from 'commander';

import Config from 'config';
import {loggerCli} from "./Lib/Logger";

import AddUserRoleCommand from "./Application/Commands/AddUserRoleCommand";
import AddUserCommand from "./Application/Commands/AddUserCommand";
import AddRoleCommand from "./Application/Commands/AddRoleCommand";

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
