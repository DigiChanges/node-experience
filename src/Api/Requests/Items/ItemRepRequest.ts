import * as express from "express";
import ItemRepPayload from "../../../Payloads/Items/ItemRepPayload";
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

    static validate() {
        return [
            body('name', "Name must exist").exists().isString(),
            body('type').exists().isInt()
        ];
    }
}

export default ItemRepRequest