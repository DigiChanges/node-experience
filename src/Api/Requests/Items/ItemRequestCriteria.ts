import * as express from "express";
import CriteriaPayload from "../../../Payloads/CriteriaPayload";

class ItemRequestCriteria implements CriteriaPayload {

    private request: express.Request;

    constructor(request: express.Request) {
        this.request = request;
    }

    id(): string {
        return this.request.params.id;
    }
}

export default ItemRequestCriteria