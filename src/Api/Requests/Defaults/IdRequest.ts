import * as express from "express";
import IdPayload from "../../../Payloads/Defaults/IdPayload";
import {param} from "express-validator";

class IdRequest implements IdPayload {

    private request: express.Request;

    constructor(request: express.Request) {
        this.request = request;
    }

    id(): string {
        return this.request.params.id;
    }

    static validate() {
        return [
            param('id')
                .exists().withMessage("id must exist")
                .isString().withMessage("Invalid ID")
        ];
    }
}

export default IdRequest