import * as express from "express";
import ItemUpdatePayload from "../../../Payloads/Items/ItemUpdatePayload";
import {body, param} from "express-validator";

class ItemUpdateRequest implements ItemUpdatePayload {

    private request: express.Request;

    constructor(request: express.Request) {
        this.request = request;
    }

    name(): string {
        return this.request.body.name;
    }

    type(): number {
        return this.request.body.type;
    }

    id(): string {
        return this.request.params.id;
    }

    static validate() {
        return [
            body('name')
                .exists().withMessage('Name must exist')
                .isString().withMessage('Name must be of type string'),
            body('type')
                .exists().withMessage('Type must exist')
                .isInt().withMessage('Type must be of type integer'),
            param('id')
                .exists().withMessage('ID mus exist')
                .isUUID().withMessage('Id must UUID type')
        ];
    }
}

export default ItemUpdateRequest