import * as express from "express";
import ItemShowPayload from "../../Payloads/ItemShowPayload";

class ItemRequestShow implements ItemShowPayload {

    private request: express.Request;

    constructor(request: express.Request) {
        this.request = request;
    }

    id(): string {
        return this.request.params.id;
    }
}

export default ItemRequestShow