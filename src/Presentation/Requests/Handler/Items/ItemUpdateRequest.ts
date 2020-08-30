import * as express from "express";
import ItemUpdatePayload from "../../../../InterfaceAdapters/Payloads/Items/ItemUpdatePayload";
import {body, param} from "express-validator";

class ItemUpdateRequest implements ItemUpdatePayload
{
    private request: express.Request;

    constructor(request: express.Request)
    {
        this.request = request;
    }

    name(): string
    {
        return this.request.body.name;
    }

    type(): number
    {
        return this.request.body.type;
    }

    enable(): boolean
    {
        return this.request.body.hasOwnProperty('enable') ? this.request.body.enable : true;
    }

    id(): string
    {
        return this.request.params.id;
    }

    static validate()
    {
        return [
            body('name')
                .exists().withMessage('name must exist')
                .isString().withMessage('name must be of type string'),
            body('type')
                .exists().withMessage('type must exist')
                .isInt().withMessage('type must be of type integer'),
            body('enable')
                .optional()
                .isBoolean().withMessage('enable must be of type boolean'),
            param('id')
                .exists().withMessage('id must exist')
                .isUUID().withMessage('id must uuid type')
        ];
    }
}

export default ItemUpdateRequest