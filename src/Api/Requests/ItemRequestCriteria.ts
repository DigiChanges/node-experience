import * as express from "express";
import Criteria from "../../Payloads/Criteria";

class ItemRequestCriteria implements Criteria {

    private request: express.Request;

    constructor(request: express.Request) {
        this.request = request;
    }

    id(): string {
        return this.request.params.id;
    }
}

export default ItemRequestCriteria