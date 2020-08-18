import * as express from "express";
import IdPayload from "../../../InterfaceAdapters/Payloads/Defaults/IdPayload";
import {param} from "express-validator";
import {ObjectID} from "mongodb";

class IdRequest implements IdPayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    id(): ObjectID
    {
        return new ObjectID(this.request.params.id);
    }

    static validate()
    {
        return [
            param('id')
                .exists().withMessage("id must exist")
                .isLength({ min: 24, max:24 })
                .isString().withMessage("Invalid ID")
        ];
    }
}

export default IdRequest