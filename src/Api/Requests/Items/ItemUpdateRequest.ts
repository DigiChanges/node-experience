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
            param('id', "Invalid UUID").exists().isUUID(),
            body('name', "Name must exist").exists().isString(),
            body('type').exists().isInt()
        ];
    }
}

export default ItemUpdateRequest