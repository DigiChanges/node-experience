import * as express from "express";
import CriteriaPayload from "../../../Payloads/CriteriaPayload";
import {param} from "express-validator";

class ItemRequestCriteria implements CriteriaPayload {

    private request: express.Request;

    constructor(request: express.Request) {
        this.request = request;
    }

    id(): string {
        return this.request.params.id;
    }

    static validate() {
        return [
            param('id', "Invalid UUID").exists().isUUID()
        ];
    }
}

export default ItemRequestCriteria