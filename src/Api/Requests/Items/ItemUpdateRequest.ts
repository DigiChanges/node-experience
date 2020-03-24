import * as express from "express";
import ItemUpdatePayload from "../../../Payloads/Items/ItemUpdatePayload";

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
}

export default ItemUpdateRequest