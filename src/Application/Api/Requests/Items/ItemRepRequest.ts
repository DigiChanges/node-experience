import * as express from "express";
import ItemRepPayload from "../../../../Domain/Payloads/Items/ItemRepPayload";
import {body} from "express-validator";

class ItemRepRequest implements ItemRepPayload {

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

    enable(): boolean {
        return this.request.body.hasOwnProperty('enable') ? this.request.body.enable : true;
    }

    static validate() {
        return [
            body('name')
                .exists().withMessage('name must exist')
                .isString().withMessage('name must be of type string'),
            body('type')
                .exists().withMessage('type must exist')
                .isInt().withMessage('type must be of type integer'),
            body('enable')
                .optional()
                .isBoolean().withMessage('enable must be of type boolean')
        ];
    }
}

export default ItemRepRequest