import * as express from "express";
import UserRepPayload from "../../../../InterfaceAdapters/Payloads/Users/UserRepPayload";
import Config from "config";
import IRoleDomain from "../../../../InterfaceAdapters/IDomain/IRoleDomain";
import {ArrayMinSize, IsArray, IsBoolean, IsEmail, IsString, Length} from "class-validator";
import {Match} from "../../../../Infrastructure/Shared/Decorators/match";

class UserRepRequest implements UserRepPayload
{
    @Length(3, 50)
    @IsString()
    firstName: string

    @Length(3, 50)
    @IsString()
    lastName: string

    @IsEmail()
    email: string

    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    @IsString()
    password: string

    @Length(Config.get('validationSettings.password.min'), Config.get('validationSettings.password.max'))
    @IsString()
    @Match("password")
    passwordConfirmation: string

    @IsBoolean()
    enable: boolean

    @IsArray()
    @ArrayMinSize(0)
    @IsString({
        each: true,

    })
    permissions: string[]

    constructor(request: express.Request)
    {
        this.firstName = request.body.firstName;
        this.lastName = request.body.lastName;
        this.email = request.body.email;
        this.password = request.body.password;
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.permissions = request.body.permissions;
        this.passwordConfirmation = request.body.passwordConfirmation;
        this.enable = request.body.hasOwnProperty('enable') ? request.body.enable : true;
    }

    getFirstName(): string
    {
        return this.firstName;
    }

    getLastName(): string
    {
        return this.lastName;
    }

    getEmail(): string
    {
        return this.email;
    }

    getPassword(): string
    {
        return this.password;
    }

    getPasswordConfirmation(): string
    {
        return this.passwordConfirmation;
    }

    getEnable(): boolean
    {
        return this.enable;
    }

    getConfirmationToken(): null
    {
        return null;
    }

    getPasswordRequestedAt(): null
    {
        return null;
    }

    getRoles(): IRoleDomain[]
    {
        return [];
    }

    getPermissions(): string[]
    {
        return this.permissions;
    }

    getIsSuperAdmin(): boolean
    {
        return false;
    }

    // static validate()
    // {
    //     return [
    //         body('firstName')
    //             .exists().withMessage('firstName must exist')
    //             .isLength({ min: 3, max: 50 }).withMessage("firstName can\'t be empty")
    //             .isString().withMessage('firstName must be of type string'),
    //         body('lastName')
    //             .exists().withMessage('lastName must exist')
    //             .isLength({ min: 3, max: 50 }).withMessage("lastName can\'t be empty")
    //             .isString().withMessage('lastName must be of type string'),
    //         body('email')
    //             .exists().withMessage('email must exist')
    //             .isEmail().withMessage('email must be a valid email'),
    //         body('password')
    //             .exists().withMessage('password must exist')
    //             .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("password can\'t be empty")
    //             .isString().withMessage('password must be of type string')
    //             .custom((value, { req }) => value === req.body.passwordConfirmation).withMessage("password don't match"),
    //         body('passwordConfirmation')
    //             .exists().withMessage('passwordConfirmation must exist')
    //             .isLength({ min: Config.get('validationSettings.password.min'), max: Config.get('validationSettings.password.max') }).withMessage("passwordConfirmation can\'t be empty")
    //             .isString().withMessage('passwordConfirmation must be of type string'),
    //         body('enable')
    //             .optional()
    //             .isBoolean().withMessage('enable must be of type boolean')
    //     ];
    // }
}

export default UserRepRequest;
