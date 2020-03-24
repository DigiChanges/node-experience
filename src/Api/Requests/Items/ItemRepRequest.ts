import * as express from "express";
import ItemRepPayload from "../../../Payloads/Items/ItemRepPayload";

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
}

export default ItemRepRequest