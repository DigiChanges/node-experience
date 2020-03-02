import ItemPayload from "../../Payloads/ItemPayload";
import * as express from "express";

class ItemRequest implements ItemPayload {

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

export default ItemRequest