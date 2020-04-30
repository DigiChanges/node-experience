#!/usr/bin/env ts-node

import {exit} from "shelljs";

process.env.SUPPRESS_NO_CONFIG_WARNING = 'y'

import {createConnection} from "typeorm";
import commander from 'commander';

import config from '../config/ormconfig';
import logger from "./Lib/Logger";

import AddUserRoleCommand from "./Commands/AddUserRoleCommand";
import AddUserCommand from "./Commands/AddUserCommand";
import AddRoleCommand from "./Commands/AddRoleCommand";

createConnection(config)
    .then(async ()=> {

        const program = commander.program;

        program.addCommand(AddUserRoleCommand);
        program.addCommand(AddUserCommand);
        program.addCommand(AddRoleCommand);

        await program.parseAsync(process.argv);
        exit();

    })
    .catch( (error) => {
            logger.info('Error');
            logger.info(error.message);
            exit();
    });
