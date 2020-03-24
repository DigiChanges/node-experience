import * as express from "express";
import IdPayload from "../../../Payloads/Defaults/IdPayload";

class IdRequest implements IdPayload {

    private request: express.Request;

    constructor(request: express.Request) {
        this.request = request;
    }

    id(): string {
        return this.request.params.id;
    }
}

export default IdRequest