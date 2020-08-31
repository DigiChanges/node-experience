import * as express from "express";
import UserUpdatePayload from "../../../../InterfaceAdapters/Payloads/Users/UserUpdatePayload";
import IdRequest from "../Defaults/IdRequest";
import {IsArray, IsBoolean, IsString} from "class-validator";

class UserUpdateRequest extends IdRequest implements UserUpdatePayload
{
    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsString()
    passwordConfirmation: string

    @IsBoolean()
    enable: boolean

    @IsArray()
    @IsString({
        each: true,
    })
    permissions: string[]

    constructor(request: express.Request)
    {
        super(request);
        this.firstName = request.body.firstName;
        this.lastName = request.body.lastName;
        this.email = request.body.email;
        this.enable = request.body.enable;
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

    getEnable(): boolean
    {
        // const userId = this.service.getLoggedId(this.request);

        // TODO: Move logic on UserCase
        // The logged user cant disable to himself.
        // if(userId === this.id)
        // {
        //    return true;
        // }

        return this.enable;
    }

    // static validate()
    // {
    //     return [
    //         body('firstName')
    //             .isLength({ min: 3, max: 50 }).withMessage("firstName can\'t be empty")
    //             .isString().withMessage('firstName must be of type string'),
    //         body('lastName')
    //             .isLength({ min: 3, max: 50 }).withMessage("lastName can\'t be empty")
    //             .isString().withMessage('lastName must be of type string'),
    //         body('email')
    //             .exists().withMessage('email must exist')
    //             .isEmail().withMessage('email must be a valid email'),
    //         body('enable')
    //             .optional()
    //             .isBoolean().withMessage('enable must be of type boolean'),
    //         param('id')
    //             .exists().withMessage('id must exist')
    //             .isUUID().withMessage('id must uuid type')
    //     ];
    // }
}

export default UserUpdateRequest